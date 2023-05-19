<template>
  <div id="timeSeries" :style="{height:height}">

  </div>
</template>
<script>
// import * as d3 from 'd3';//引入d3
export default({
  name:"",
  data()
  {
      return{
          dataSets:{
              Sequence:{}
          }
      }
  },
  props:{
    height:String
  },
  computed:{
    InitStep(){
      return parseInt(this.$store.state.Parameters["InitStep"])
    },
    Time_Series(){
        return parseInt(this.$store.state.Parameters["Time_Series"])
    }
  },
  watch:{
    InitStep(newval){
      console.log("初始化步长更新啦！"+newval)
      console.log(this.InitStep)
    },
    Time_Series(newval){
      console.log("时间步长更新啦！"+newval)
      console.log(this.Time_Series)
    }
  },
  methods:{
      getData()
      {
          this.$parent.$on('Msg got',(()=>{
              this.dataSets.Sequence=this.$parent.dataSets.Sequence;
              this.$emit('success');
          }))
      },
      Timeseries_Structure(valid_y,hiddens,Location)
      {
          const svg = d3.select("#"+Location)
                  .append("svg")
                  .attr("width", "100%")
                  .attr("height", "100%");
          //var svg=d3.select(Location).append("svg").attr("width","300px").attr("height",'300px')
              //定义节点及线参数
          var cx=19;
          var ccx=19;
          var ccy,cy=135;
          var r1=15;
          var r2=10;
          var gap=15;//节点之间的间隔
          var color_h1="gray";//初始状态隐藏层
          var color_h2="#6bddaa";//实际隐藏层
          var color_input="#fce5cd";//输入节点
          var color_output="#6d9eeb";//输出节点
          for(var i=0;i<valid_y;i++)
          {
              if(i==2){
                  i=valid_y-3;
                  svg.append("text")
                      .text("...")
                      .attr("x",cx-4)
                      .attr("y",cy+1)
                      .style("font-size", "15px")
                      .style("font-weight", "bold");
                  this.draw_arrow(cx+r1,cy,cx+r1+gap-3,cy);
                  cx=cx+gap+2*r1;
              }
              else{
                  /////隐层节点//////
                  this.draw_circle(cx,cy,r1,color_h2,svg);
                  /////输入节点//////
                  this.draw_circle(cx,cy+50,r2,color_input,svg);
                  ////隐层之间的箭头////
                  this.draw_arrow(cx+r1,cy,cx+r1+gap-3,cy,svg);
                  /////输入层与隐层之间的箭头////
                  this.draw_arrow(cx,cy+40,cx,cy+18,svg);
                  //////输出层节点/////
                  this.draw_circle(cx,cy-50,r2,"#d9d9d9",svg);
                  /////输出层与隐层之间的箭头////
                  this.draw_arrow(cx,cy-15,cx,cy-37,svg);
                  cx=cx+2*r1+gap;
              }
          }
          ////////汇总节点数量//////////
          this.HuaKuoHao(ccx,cy-70,cx-gap-2*r1,cy-70,valid_y,svg);
          ////////画隐藏层//////
              cx=cx+5;
              ccx=cx;
              var color="green";
              for(var i=0;i<hiddens;i++)
              {
                  if(i==2){
                      i=hiddens-3;
                      this.draw_arrow(cx+r1,cy,cx+r1+gap-3,cy,svg);
                      svg.append("text")
                          .text("...")
                          .attr("x",cx-4)
                          .attr("y",cy+1)
                          .style("font-size", "15px")
                          .style("font-weight", "bold");
                      cx=cx+gap+2*r1;
                  }
                  else{
                      /////隐层节点//////
                      this.draw_circle(cx,cy,r1,color_h2,svg);
                      ////隐层之间的箭头////
                      if(i!=hiddens-1)
                      this.draw_arrow(cx+r1,cy,cx+r1+gap-3,cy,svg);
                      /////输入节点//////
                      this.draw_circle(cx,cy+50,r2,color_input,svg);
                      /////输入层与隐层之间的箭头////
                      this.draw_arrow(cx,cy+40,cx,cy+18,svg);
                      //////输出层节点/////
                      this.draw_circle(cx,cy-50,r2,color_output,svg);
                      /////输出层与隐层之间的箭头////
                      this.draw_arrow(cx,cy-15,cx,cy-37,svg);
                      cx=cx+2*r1+gap;
                  }
              }
          ///////////////汇总节点数量/////////////////
              this.HuaKuoHao(ccx,cy-70,cx-gap-2*r1,cy-70,hiddens,cy-50+40,svg);
      },
      //////////初始状态层

      ////////////////函数/////////////////
      ////////////////画圆/////////////////
      draw_circle(cx,cy,r,color,svg){
       svg.append("circle")
          .attr("cx", cx)
          .attr("cy", cy)
          .attr("r", r)
          .attr("fill", color);
      },
      /////////画箭头/////////
      draw_arrow(x1,y1,x2,y2,svg){
        var svg = d3.select('svg');
        //箭头
        var marker =svg.append("marker")
          .attr("id", "arrow")
          .attr("markerUnits","strokeWidth")//设置为strokeWidth箭头会随着线的粗细发生变化
          .attr("viewBox", "0 0 12 12")//坐标系的区域
          .attr("refX", 6)//箭头坐标
          .attr("refY", 6)
          .attr("markerWidth", 12)
          .attr("markerHeight", 12)
          .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
          .append("path")
          .attr("d", "M2,2 L10,6 L2,10 L6,6 L2,2")//箭头的路径
          .attr('fill', 'black');//箭头颜色
         ///////// 绘制直线
        var line = svg.append("line")
            .attr("x1",x1)
            .attr("y1",y1)
            .attr("x2",x2)
            .attr("y2",y2)
            .attr("stroke","black")
            .attr("stroke-width",1)
            .attr("marker-end","url(#arrow)");
      },
      ////////绘制花括号/////////
      HuaKuoHao(x1,y1,x2,y2,nodes,svg){
          var svg = d3.select('svg');
          var n=(x2-x1)/2+x1;
          var line = svg.append("line")
              .attr("x1",x1-4)
              .attr("y1",y1+4)
              .attr("x2",x1)
              .attr("y2",y1)
              .attr("stroke","black")
              .attr("stroke-width",1)
          var line = svg.append("line")
              .attr("x1",x1)
              .attr("y1",y1)
              .attr("x2",n-4)
              .attr("y2",y1)
              .attr("stroke","black")
              .attr("stroke-width",1)
          var line = svg.append("line")
              .attr("x1",n-4)
              .attr("y1",y1)
              .attr("x2",n)
              .attr("y2",y1-4)
              .attr("stroke","black")
              .attr("stroke-width",1)
          ////////标签////////
          svg.append("text")
              .text("共有节点数"+nodes+"个")
              .attr("x",n-45)
              .attr("y",y1-10)
              .style("font-size", "15px")
              .style("font-weight", "bold");
          var line = svg.append("line")
              .attr("x1",n)
              .attr("y1",y1-4)
              .attr("x2",n+4)
              .attr("y2",y1)
              .attr("stroke","black")
              .attr("stroke-width",1)
          var line = svg.append("line")
              .attr("x1",n+4)
              .attr("y1",y1)
              .attr("x2",x2)
              .attr("y2",y2)
              .attr("stroke","black")
              .attr("stroke-width",1)
          var line = svg.append("line")
              .attr("x1",x2)
              .attr("y1",y1)
              .attr("x2",x2+4)
              .attr("y2",y2+4)
              .attr("stroke","black")
              .attr("stroke-width",1)
      }
  },
  mounted(){
      this.getData();
       this.$on('success',(()=>{
        console.log("我是时序结构组件，我已经获取到父组件的数据了")
        // console.log(typeof(this.dataSets.Sequence.InitStep))
        this.Timeseries_Structure(50,100,"timeSeries")
        ////////给子组件发送消息///////
        this.$emit('Msg got');
    }))
  // this.Timeseries_Structure(this.InitStep,this.Time_Series,"timeSeries")    
  }
})
</script>

<template>
  <!-- <svg width="300" height="200" style="background-color: white;">
    <rect x="35" y="35" width="230" height="130"></rect>
  </svg> -->
  <div id="svgcontainer"></div>
</template>
<script>
import * as d3 from "d3";
export default {
  name: "vue-line-chart",
  data () {
    return {};
  },
  mounted () {
    this.draw();
  },
  methods: {
    draw () {
      var svg_width = 350;
      var svg_height = 250;
      var svg = d3
        .select("#svgcontainer")
        .append("svg")
        .attr("width", svg_width)
        .attr("height", svg_height);
      svg
        .append("rect")
        .attr("x", 50)
        .attr("y", 35)
        .attr("rx", "15")
        .attr("ry", "15")
        .attr("width", 230)
        .attr("height", 130)
        .attr("fill", "#DFFFDF")
        .style("stroke", "#007500")
        .style("stroke-width", 2);
      svg
        .append("circle")
        .attr("cx", 15)
        .attr("cy", 60)
        .attr("r", 15)
        .attr("fill", "yellow")
        .style("stroke", "black")
        .style("stroke-width", 2);

      var marker = svg
        .append("marker")
        .attr("id", "arrow")
        .attr("markerUnits", "strokeWidth") //设置为strokeWidth箭头会随着线的粗细发生变化
        .attr("viewBox", "0 0 12 12") //坐标系的区域
        .attr("refX", 6) //箭头坐标
        .attr("refY", 6)
        .attr("markerWidth", 12)
        .attr("markerHeight", 12)
        .attr("orient", "auto") //绘制方向，可设定为：auto（自动确认方向）和 角度值
        .append("path")
        .attr("d", "M6,3 L10,6 L6,9  L6,3") //箭头的路径
        .attr("fill", "black"); //箭头颜色

      var line = svg//左上箭头
        .append("line")
        .attr("x1", 30)
        .attr("y1", 60)
        .attr("x2", 37)
        .attr("y2", 60)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("marker-end", "url(#arrow)");
      svg
        .append("circle")
        .attr("cx", 15)
        .attr("cy", 140)
        .attr("r", 15)
        .attr("fill", "#d3a4ff")
        .style("stroke", "black")
        .style("stroke-width", 2);
      var line = svg//左下箭头
        .append("line")
        .attr("x1", 30)
        .attr("y1", 140)
        .attr("x2", 37)
        .attr("y2", 140)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("marker-end", "url(#arrow)");
      svg
        .append("circle")
        .attr("cx", 70)
        .attr("cy", 190)
        .attr("r", 15)
        .attr("fill", "#84C1FF")
        .style("stroke", "black")
        .style("stroke-width", 2);
      svg
        .append("circle")
        .attr("cx", 320)
        .attr("cy", 60)
        .attr("r", 15)
        .attr("fill", "yellow")
        .style("stroke", "black")
        .style("stroke-width", 2);
      svg
        .append("circle")
        .attr("cx", 320)
        .attr("cy", 140)
        .attr("r", 15)
        .attr("fill", "#d3a4ff")
        .style("stroke", "black")
        .style("stroke-width", 2);
      svg//Xt对应的线
        .append("line")
        .attr("x1", 70)
        .attr("y1", 175)
        .attr("x2", 70)
        .attr("y2", 140)
        .attr("stroke", "black")
        .attr("stroke-width", 3)

      // let dx = 10, x1 = 40, y1 = 175, x2 = 70, y2 = 145;
      // let dy = Math.round(Math.abs(((y2 - y1) / (x2 - x1)) * dx));
      // //向右上弯曲
      // let cpx = Math.round((x1 + x2) / 2 + dx);
      // let cpy = Math.round((x1 + x2) / 2 - dy);

      // var path = d3.path();
      // path.moveTo(x1, y1);
      // path.quadraticCurveTo(0, cpy, x2, y2);
      // svg.append('path')
      //       .attr('d', path.toString())
      //       .style('fill','none')
      //       .style('stroke','red')
      //       .style('stroke-width','3')
      svg//左下横线
        .append("line")
        .attr("x1", 51)
        .attr("y1", 140)
        .attr("x2", 200)
        .attr("y2", 140)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
      svg//左上横线
        .append("line")
        .attr("x1", 51)
        .attr("y1", 60)
        .attr("x2", 292)
        .attr("y2", 60)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("marker-end", "url(#arrow)");
      svg//左一箭头
        .append("line")
        .attr("x1", 80)
        .attr("y1", 140)
        .attr("x2", 80)
        .attr("y2", 80)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("marker-end", "url(#arrow)");
      svg//粉色大X
        .append("circle")
        .attr("cx", 80)
        .attr("cy", 60)
        .attr("r", 8)
        .attr("fill", "pink")
        .style("stroke", "black")
        .style("stroke-width", 1);
      svg//黄色矩形1
        .append("rect")
        .attr("x", 70)
        .attr("y", 115)
        .attr("width", 20)
        .attr("height", 13)
        .attr("fill", "#FFFF93")
        .style("stroke", "black")
        .style("stroke-width", 1);
      
      svg//左二箭头
        .append("line")
        .attr("x1", 120)
        .attr("y1", 140)
        .attr("x2", 120)
        .attr("y2", 100)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
       
      svg//左二箭头
        .append("line")
        .attr("x1", 119)
        .attr("y1", 100)
        .attr("x2", 140)
        .attr("y2", 100)
        .attr("stroke", "black")
        .attr("stroke-width", 3) 
        .attr("marker-end", "url(#arrow)");
       svg//黄色矩形2
        .append("rect")
        .attr("x", 110)
        .attr("y", 115)
        .attr("width", 20)
        .attr("height", 13)
        .attr("fill", "#FFFF93")
        .style("stroke", "black")
        .style("stroke-width", 1);

      svg//左三箭头
        .append("line")
        .attr("x1", 160)
        .attr("y1", 140)
        .attr("x2", 160)
        .attr("y2", 80)
        .attr("stroke", "black")
        .attr("stroke-width", 3) 
        .attr("marker-end", "url(#arrow)");     
       svg//粉色加号
        .append("circle")
        .attr("cx", 160)
        .attr("cy", 100)
        .attr("r", 8)
        .attr("fill", "pink")
        .style("stroke", "black")
        .style("stroke-width", 1);

      svg//粉色大X 2
        .append("circle")
        .attr("cx", 160)
        .attr("cy", 60)
        .attr("r", 8)
        .attr("fill", "pink")
        .style("stroke", "black")
        .style("stroke-width", 1)
       svg//黄色矩形2
        .append("rect")
        .attr("x", 148)
        .attr("y", 115)
        .attr("width", 25)
        .attr("height", 13)
        .attr("fill", "#FFFF93")
        .style("stroke", "black")
        .style("stroke-width", 1);
      svg//左四箭头
        .append("line")
        .attr("x1", 199)
        .attr("y1", 140)
        .attr("x2", 199)
        .attr("y2", 100)
        .attr("stroke", "black")
        .attr("stroke-width", 3)
       
      svg//左四箭头
        .append("line")
        .attr("x1", 198)
        .attr("y1", 100)
        .attr("x2", 209)
        .attr("y2", 100)
        .attr("stroke", "black")
        .attr("stroke-width", 3) 
        .attr("marker-end", "url(#arrow)");
      svg//黄色矩形4
        .append("rect")
        .attr("x", 189)
        .attr("y", 115)
        .attr("width", 20)
        .attr("height", 13)
        .attr("fill", "#FFFF93")
        .style("stroke", "black")
        .style("stroke-width", 1);
      svg//左四竖线
        .append("line")
        .attr("x1", 229)
        .attr("y1", 140)
        .attr("x2", 229)
        .attr("y2", 60)
        .attr("stroke", "black")
        .attr("stroke-width", 3)    

      svg//粉色大X 3
        .append("circle")
        .attr("cx", 229)
        .attr("cy", 100)
        .attr("r", 8)
        .attr("fill", "pink")
        .style("stroke", "black")
        .style("stroke-width", 1);

      svg.append("ellipse")//粉色椭圆
            .attr("cx", 229)
            .attr("cy", 77)
            .attr("rx", 15)
            .attr("ry", 8)
            .attr("fill", "pink")
            .style("stroke", "black")
            .style("stroke-width", 1);
      
      svg//右下横线
        .append("line")
        .attr("x1", 228)
        .attr("y1", 140)
        .attr("x2", 292)
        .attr("y2", 140)
        .attr("stroke", "black")
        .attr("stroke-width", 3)   
        .attr("marker-end", "url(#arrow)"); 
      svg//最后一根竖线
        .append("line")
        .attr("x1", 255)
        .attr("y1", 140)
        .attr("x2", 255)
        .attr("y2", 65)
        .attr("stroke", "black")
        .attr("stroke-width", 3)   
      svg//最后一根竖线
        .append("line")
        .attr("x1", 255)
        .attr("y1",55)
        .attr("x2", 255)
        .attr("y2", 35)
        .attr("stroke", "black")
        .attr("stroke-width", 3)   
      svg//文字
        .append('text')
        .attr("x",155.4)
        .attr("y",65)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("+")
      svg//文字
        .append('text')
        .attr("x",156)
        .attr("y",104)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("x")
      svg//文字
        .append('text')
        .attr("x",156)
        .attr("y",104)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("x")
      svg//文字
        .append('text')
        .attr("x",76)
        .attr("y",64)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("x")
      svg//文字
        .append('text')
        .attr("x",225)
        .attr("y",104)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("x")
      svg//文字
        .append('text')
        .attr("x",218)
        .attr("y",80)
        .style('font-weight', 10)
        .style('font-size', '11px')
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("tanh")
       svg//文字
        .append('text')
        .attr("x",75)
        .attr("y",126)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("σ")
      svg//文字
        .append('text')
        .attr("x",115)
        .attr("y",126)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("σ")
      svg//文字
        .append('text')
        .attr("x",194)
        .attr("y",126)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("σ")
      svg//文字
        .append('text')
        .attr("x",150)
        .attr("y",125)
        .style('font-weight', 10)
        .style('font-size', '11px')
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("tanh")
      svg//文字
        .append('text')
        .attr("x",9)
        .attr("y",65)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("C")
      svg//文字
        .append('text')
        .attr("x",11)
        .attr("y",145)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("h")
      svg//文字
        .append('text')
        .attr("x",64.5)
        .attr("y",196)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("X")
      svg//文字
        .append('text')
        .attr("x",314)
        .attr("y",65)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("C")
      svg//文字
        .append('text')
        .attr("x",315.5)
        .attr("y",145)
        .style('font-weight', 400)
        .style('font-family', 'Arial')
        .style('fill', 'black')
        .text("h")
    },

  },
};
</script>

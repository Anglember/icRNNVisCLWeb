<template>
  <!-- <div v-if="dataSource=='activity'" style="margin-left:2%; float: right;font-size: 5px; width: 15%; height:22%; text-align:center;"> -->
  <!-- </div> -->
  <div id="Chart" ref="Chart" v-loading="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    :style="{height:height}"></div>
</template>
<script>
import * as echarts from "echarts";
let elementResizeDetectorMaker = require("element-resize-detector");

export default {
  name: "ModelArchitectureEvaluation",
  data () {
    return {
      node: "结构评估",
      dataSets: {
        activity: {},
        loss: [],
        weight: {},
        origin: {},
        predict: {},
      },
      ColorData: [],
      myChart: null
    };
  },
  computed: {
    ////////用于获取隐藏单元数/////////
    // ModelParameter() {
    //   return this.$store.state.Parameters;
    // },
  },
  props: {
    dataSource: {
      default: " ",
    },
    start: Number,
    end: Number,
    value: Number,
    data: {
      type: Object,
      TimeStart: Number,
      TimeEnd: Number,
      checkList: ["RealData", "PredictData"],
    },
    mapping: {
      type: Object,
      RealdataColor: "CornflowerBlue",
      PredictdataColor: "CadetBlue",
    },
    ResizeData: {
      type: Number,
    },
    height: String
  },
  watch: {
    ////////标识神经网络隐藏层数////////
    ResizeData (newval) {
      this.myChart.resize();
    },
    ModelParameter (newval) {
      console.log("获取到参数值了：" + newval);
      console.log(this.ModelParameter);
    },
    "data.TimeStart" (newval) {
      this.changeLine();
    },
    "data.TimeEnd" (newval) {
      this.changeLine();
    },
    "data.checkList" (newval) {
      console.log("data.checkList", newval);
      this.changeCheckList(newval);
    },
    "mapping.RealdataColor" (newval) {
      this.changeColor(this.dataSets.predict);
    },
    "mapping.PredictdataColor" (newval) {
      this.changeColor(this.dataSets.predict);
    },
    start (newval) {
      this.update();
    },
    end (newval) {
      this.update();
    },
    value (newval) {
      //console.log("ThreadLineChart",newval)
      var datax = [];
      var series = [];
      //var my_color=['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
      for (var i = 0; i < this.dataSets.predict[0].length / newval; i++) {
        datax[i] = i;
      }
      for (var i = 0; i < this.dataSets.predict.length; i++) {
        var Averagedata = [0];
        var j = 1;
        var k = 0;
        var res = 0;
        res = this.dataSets.predict[0].length % newval;
        for (var m = 0; m < this.dataSets.predict[0].length; m++) {
          Averagedata[k] += this.dataSets.predict[i][m];
          //console.log("现在的j值",j,"现值",Averagedata[k])
          if (j == newval) {
            Averagedata[k] = Averagedata[k] / newval;
            k++;
            Averagedata[k] = 0;
            j = 0;
          }
          j++;
          //console.log("i的值:",i,"j的值:",j,"k的值:",k,"平均值:",Averagedata[0],Averagedata[1],Averagedata[2],Averagedata[3],Averagedata[4])
        }
        if (res) {
          Averagedata[k] /= res;
        }
        series.push({
          type: "line",
          lineStyle: { width: 1 },
          smooth: true,
          showSymbol: false,
          data: Averagedata,
        });
        //console.log("看一下data的格式")
        //console.log(this.dataSets.data[i+1])
        // var max=Math.max.apply(null,Averagedata)
        // console.log("最大值",max)
        // console.log("有几个数据",k)
        // for(var i=0;i<k;i++)
        // console.log("第几个",i,"dadada",Averagedata[i])
      }
      this.option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: datax,
          show: true,
        },
        series: series,
      };
      this.myChart.setOption(this.option);
      this.myChart.resize();
    },
  },
  methods: {
    changeCheckList (newval) {
      var bool = [];
      switch (newval.length) {
        case 0:
          bool = [false, false];
          break;
        case 1:
          {
            if (newval[0] == "RealData") {
              bool = [true, false];
            } else {
              bool = [false, true];
            }
          }
          break;
        case 2:
          bool = [true, true];
          break;
      }
      var selected = [{ "RealData": bool[0], PredictData: bool[1] }];
      this.option = {
        legend: {
          selected: selected[0],
          show: false,
        },
      };
      console.log("this.bool", bool, selected);
      this.myChart.setOption(this.option);
    },
    changeColor (data) {
      var my_color = [
        this.mapping.RealdataColor,
        this.mapping.PredictdataColor,
      ];
      var series = [];
      var linename = ["RealData", "PredictData"];
      for (var i = 0; i < data.length; i++) {
        series.push({
          id: "line" + i.toString(),
          type: "line",
          smooth: true,
          name: linename[i],
          showSymbol: false,
          color: my_color[i],
          //data: this.ColorData[i],
        });
        //console.log("看一下data的格式")
        //console.log(this.dataSets.data[i+1])
      }
      this.myChart = echarts.init(this.$refs.Chart);
      this.option = {
        series: series,
      };
      this.option && this.myChart.setOption(this.option);
      //console.timeEnd("折线图渲染时间");
    },
    changeLine () {
      console.log("this.Linechart", this.data.TimeStart, this.data.TimeEnd);
      var datax = [];
      var series = [];
      var countx = 0;
      //var my_color=['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
      for (var i = this.data.TimeStart; i <= this.data.TimeEnd; i++) {
        datax[countx] = i;
        countx++;
      }
      for (var i = 0; i < this.dataSets.predict; i++) {
        var Linedata = [];
        var count = 0;
        for (var j = this.data.TimeStart; j <= this.data.TimeEnd; j++) {
          Linedata[count] = this.dataSets.predict[i][j - 1];
          series.push({
            type: "line",
            lineStyle: { width: 1 },
            smooth: true,
            showSymbol: false,
            data: Linedata,
          });
          count++;
        }
      }
      this.option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: datax,
          show: true,
        },
        series: series,
      };
      this.myChart.setOption(this.option);
      this.myChart.resize();
    },
    LineChart (data) {
      //var dim=this.dataSets.parameter;
      var j;
      var my_color = ["CornflowerBlue", "CadetBlue"];
      var series = [];
      var datax = [];
      for (var i = 0; i < data[0].length / 1; i++) {
        datax[i] = i + 1;
      }
      var linename = ["RealData", "PredictData"];
      for (var i = 0; i < data.length; i++) {
        var Averagedata = [0];
        var j = 1;
        var k = 0;
        var res = 0;
        res = data[0].length % 1;
        for (var m = 0; m < data[0].length; m++) {
          Averagedata[k] += data[i][m];
          //console.log("现在的j值",j,"现值",Averagedata[k])
          if (j == 1) {
            Averagedata[k] = Averagedata[k] / 1;
            k++;
            Averagedata[k] = 0;
            j = 0;
          }
          j++;
          //console.log("i的值:",i,"j的值:",j,"k的值:",k,"平均值:",Averagedata[0],Averagedata[1],Averagedata[2],Averagedata[3],Averagedata[4])
        }
        if (res) {
          Averagedata[k] /= res;
        }
        this.ColorData[i] = Averagedata;
        series.push({
          type: "line",
          smooth: true,
          name: linename[i],
          showSymbol: false,
          color: my_color[i],
          data: Averagedata,
        });
        //console.log("看一下data的格式")
        //console.log(this.dataSets.data[i+1])
      }
      this.myChart = echarts.init(this.$refs.Chart);
      this.option = {
        grid: {
          left: "8%",
          // right:'10%',
          bottom: "12%",
          width: "89%",
          top: "5%",
          height: "80%",
        },
        // legend: {
        //   data: ["RealData", "PredictData"],
        //   selected: {
        //     // 选中'系列1'
        //     RealData: true,
        //     // 不选中'系列2'
        //     PredictData: true,
        //   },
        // },
        toolbox: {
          feature: {
            dataZoom: {},
            // brush: {
            //     type: ['rect', 'polygon', 'clear']
            // }
          },
          top: "-2%",
          right: "2%",
        },
        dataZoom: [
          {
            show: false,
            height: "10%",
            bottom: "5%",
            left: "4%",
            type: "slider",
            start: this.start,
            end: this.end,
          },
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: datax,
          show: true,
        },
        yAxis: {
          type: "value",
          // max: "dataMax",
          // min: function(value) {
          //   //alert(value.min.toFixed(3))
          //   return value.min.toFixed(3);
          // },
          max: 500,
          min: 450,
        },
        series: series,
      };
      this.myChart.on("datazoom", (params) => {
        let end1 = this.myChart.getOption().dataZoom[0].end;
        let start1 = this.myChart.getOption().dataZoom[0].start;
        //console.log("这是现在获取到的",this.start,this.end)
        this.$emit("datachange", start1, end1);
        //this.drawLine()
      });
      this.option && this.myChart.setOption(this.option);
      let erd = elementResizeDetectorMaker();
      let that = this;
      erd.listenTo(document.getElementById("Chart"), function (element) {
        that.$nextTick(function () {
          this.myChart.resize();
        })
      })
    },
    Get_Data (res) {
      this.dataSets.activity = res.hidden_value;
      this.dataSets.origin = res.data_x;
      this.dataSets.predict = res.data_y;
      for (var i = 0; i < this.dataSets.predict[0].length; i++) {
        // this.dataSets.loss[i]=Math.abs(this.dataSets.predict[1][i]-this.dataSets.predict[0][i])
        this.dataSets.loss[i] =
          this.dataSets.predict[1][i] - this.dataSets.predict[0][i];
      }
      console.log("多线程里调用函数", this.dataSets);
    },
    ////////当所有数据均获取到后发送消息//////////
    async getData () {
      // console.time("折线图渲染时间");

      await this.get_model_data();
      //  console.timeEnd('折线图获取数据时间')
    },
    //////////////获取激活值///////////////
    async get_model_data () {
      //await   this.$http.get('http://10.120.195.170//model/mul_line_chart').then(res => {
      // await this.$http.get('http://10.120.18.77//model/mul_line_chart').then(res => {
      await this.$http
        .get("http://127.0.0.1:5000//model/mul_line_chart")
        .then((res) => {
          // await   this.$http.get('http://localhost:5000/getSummarydata').then(res => {
          //this.Boxplot(res.data)
          if (res.data) {
            this.dataSets.origin = JSON.parse(JSON.stringify(res.data.data_x));
            this.dataSets.predict = JSON.parse(JSON.stringify(res.data.data_y));
            this.dataSets.activity = JSON.parse(
              JSON.stringify(res.data.hidden_value)
            );
            for (var i = 0; i < this.dataSets.predict[0].length; i++) {
              // this.dataSets.loss[i]=Math.abs(this.dataSets.predict[1][i]-this.dataSets.predict[0][i])
              this.dataSets.loss[i] =
                this.dataSets.predict[1][i] - this.dataSets.predict[0][i];
            }
          }
        })
        .catch((err) => {
          alert("激活值获取失败啦：" + err);
        });
      this.LineChart(this.dataSets.predict);
    },
  },
  created () {
    setTimeout(() => {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.getData();
        })
      })
    }, 0)
  },
  mounted () {



    // console.time("多线程折线图渲染时间");
    // this.$worker
    //   .run(() => {
    //     var xhr = new XMLHttpRequest();
    //     var str;
    //     xhr.open("GET", "http://127.0.0.1:5000//model/mul_line_chart", false);
    //     xhr.onreadystatechange = function() {
    //       str = JSON.parse(xhr.responseText);
    //       console.log("利用XML从后端获取的数据", str);
    //     };
    //     xhr.send();
    //     var data=str.data_y;
    //     console.log("多线程里的折线图的数据",data)
    //     var j;
    //     var my_color = ["CornflowerBlue", "CadetBlue"];
    //     var series = [];
    //     var datax = [];
    //     for (var i = 0; i < data[0].length / 1; i++) {
    //       datax[i] = i;
    //     }
    //     var linename = ["RealData", "PredictData"];
    //     for (var i = 0; i < data.length; i++) {
    //       var Averagedata = [0];
    //       var j = 1;
    //       var k = 0;
    //       var res = 0;
    //       res = data[0].length % 1;
    //       for (var m = 0; m < data[0].length; m++) {
    //         Averagedata[k] += data[i][m];
    //         //console.log("现在的j值",j,"现值",Averagedata[k])
    //         if (j == 1) {
    //           Averagedata[k] = Averagedata[k] / 1;
    //           k++;
    //           Averagedata[k] = 0;
    //           j = 0;
    //         }
    //         j++;
    //         //console.log("i的值:",i,"j的值:",j,"k的值:",k,"平均值:",Averagedata[0],Averagedata[1],Averagedata[2],Averagedata[3],Averagedata[4])
    //       }
    //       if (res) {
    //         Averagedata[k] /= res;
    //       }
    //       series.push({
    //         type: "line",
    //         smooth: true,
    //         name: linename[i],
    //         showSymbol: false,
    //         color: my_color[i],
    //         data: Averagedata,
    //       });
    //       //console.log("看一下data的格式")
    //       //console.log(this.dataSets.data[i+1])
    //     }
    //     //this.myChart = echarts.init(this.$refs.Chart);
    //    option = {
    //       grid: {
    //         left: "8%",
    //         // right:'10%',
    //         bottom: "12%",
    //         width: "89%",
    //         top: "5%",
    //         height: "80%",
    //       },
    //       legend: {
    //         data: ["RealData", "PredictData"],
    //       },
    //       toolbox: {
    //         feature: {
    //           dataZoom: {},
    //           // brush: {
    //           //     type: ['rect', 'polygon', 'clear']
    //           // }
    //         },
    //         top: "-2%",
    //         right: "2%",
    //       },
    //       dataZoom: [
    //         {
    //           show: false,
    //           height: "10%",
    //           bottom: "5%",
    //           left: "4%",
    //           type: "slider",
    //           //start: this.start,
    //           //end: this.end,
    //         },
    //       ],
    //       xAxis: {
    //         type: "category",
    //         boundaryGap: false,
    //         data: datax,
    //         show: false,
    //       },
    //       yAxis: {
    //         type: "value",
    //         max: "dataMax",
    //         min: "dataMin",
    //       },
    //       series: series,
    //     };
    //     return option;
    //   })
    //   .then((option) => {
    //     var myChart = echarts.init(this.$refs.Chart);
    //     option && myChart.setOption(option);3
    //     console.timeEnd("多线程折线图渲染时间")
    //   });
  },
};
</script>

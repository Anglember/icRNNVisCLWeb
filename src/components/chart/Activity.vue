<template>
  <div id="Chart" ref="Chart" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" :style="{height:height}"></div>
</template>
<script>
import axios from "axios";
import * as echarts from "echarts";
let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "NodeActMode",
  data () {
    return {
      node: "结构评估",
      styleObject: {
        width: this.width,
        height: this.height,
        border: this.border,
      },
      Mymodule_name: this.module_name,
      name: "标识",
      dataSets: {
        activity: {},
        loss: [],
        weight: {},
        origin: {},
        predict: {},
      },
      dialogTableVisible: false,
      activeName: "first",
      // NeuronStart: 4,
      // NeuronEnd: 5,
      // TimeStart: 1,
      // TimeEnd: 500,
      datam: [],
      myChart: null,
      //activeNames:['1'],
    };
  },
  props: {
    width: {
      default: "100%",
    },
    height: {
      default: "100%",
    },
    border: {
      default: "1px solid black",
    },
    module_name: {
      default: "",
    },
    dataSource: {
      type: Array,
      default: () => ["origin", "activity", "predict"],
    },
    Heatdata: {
      type: Object,
      NeuronStart: null,
      NeuronEnd: null,
      TimeStart: null,
      TimeEnd: null
    },
    Interact: {
      type: Object
    },
    test: Number,
    ResizeData: {
      type: Number,
    },
  },
  computed: {
    ////////用于获取隐藏单元数/////////
    // ModelParameter () {
    //   return this.$store.state.Parameters;
    // },
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
    "Heatdata.NeuronStart" (newval) {
      this.changeHeatmap();
    },
    "Heatdata.NeuronEnd" (newval) {
      this.changeHeatmap();
    },
    "Heatdata.TimeStart" (newval) {
      this.changeHeatmap();
    },
    "Heatdata.TimeEnd" (newval) {
      this.changeHeatmap();
    },
    "Interact.checkList" (newval) {
      this.HandleInteract(newval)
    }
  },
  methods: {
    HandleInteract (newval) {
      // var bool = [false];
      // for (var i = 0; i < newval.length; i++) {
      //   switch (newval[i]) {
      //     case "悬浮-细节": bool[0] = true; break;
      //   }
      // }
      var option = {
        tooltip: {
          position: "right",
          formatter: function (params) {
            return (
              params.seriesName +
              " :<br/>" +
              "第" +
              (params.data[1] + 1) +
              "个神经元" +
              " " +
              "第" +
              (params.data[0] + 1) +
              "个时间步" +
              " :<br/>" +
              "激活值：" +
              params.data[2]
            );
          },
          show: newval[0]
        },
      }
      // bool = [false];
      this.myChart.setOption(option)
    },
    changeHeatmap () {
      var datay = [];
      var datax = [];
      var county = 0;
      var countx = 0;
      var countdata = 0;
      var HeatData = [];
      var position = 0;
      for (var i = this.Heatdata.NeuronStart; i <= this.Heatdata.NeuronEnd; i++) {
        datay[county] = "神经元" + i;
        county++;
      }
      for (var i = this.Heatdata.TimeStart; i <= this.Heatdata.TimeEnd; i++) {
        datax[countx] = i;
        countx++;
      }
      for (
        var i = (this.Heatdata.NeuronStart - 1) * 500;
        i <= (this.Heatdata.NeuronEnd - 1) * 500 + 499;
        i++
      ) {
        if (
          this.datam[i][0] >= this.Heatdata.TimeStart - 1 &&
          this.datam[i][0] <= this.Heatdata.TimeEnd - 1
        ) {
          HeatData[countdata] = this.datam[i];
          HeatData[countdata][1] = position;
          HeatData[countdata][0] = HeatData[countdata][0] - this.Heatdata.TimeStart + 1;
          countdata++;
          if (countdata % (this.Heatdata.TimeEnd - this.Heatdata.TimeStart + 1) === 0) {
            position++;
          }
        }
      }
      //console.log("热力图组件改变", HeatData, HeatData.length);
      var option = {
        xAxis: {
          type: "category",
          data: datax,
          show: true,
        },
        yAxis: {
          type: "category",
          data: datay,
          show: true,
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: JSON.parse(JSON.stringify(HeatData)),
            label: {
              show: false,
            },
            itemStyle: {
              // shadowBlur: 10,
              width: "1px",
              height: "1px",
              borderRadius: [15, 15, 15, 15],
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
    async getData () {

      await this.get_model_data();
      //console.timeEnd('热力图获取数据时间')

    },
    //////////////获取激活值///////////////
    async get_model_data () {
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
              this.dataSets.loss[i] = Math.abs(
                this.dataSets.predict[1][i] - this.dataSets.predict[0][i]
              );
            }
            // this.$emit("GetData", this.dataSets.activity[0]);
          }
        });
      this.Draw_Heatmap(this.dataSets.activity[0]);
    },
    ////////当所有数据均获取到后发送消息//////////
    Get_Data (res) {
      this.dataSets.activity = res.hidden_value;
      this.Draw_Heatmap(this.dataSets.activity[0]);
    },
    Draw_Heatmap (data) {
      var datatemp = [];
      var datax = [];
      var datay = [];
      for (var i = 0; i < data.length; i++) {
        datay[i] = "神经元" + (i + 1);
      }
      for (var i = 0; i < 500; i++) {
        datax[i] = i + 1;
      }
      var x_length = data.length;
      var count = 0;


      for (var i = 0; i < data.length; i++) {
        var Averagedata = [0];
        var j = 1;
        var k = 0;
        var res = 0;
        res = data[0].length % 10;
        for (var m = 0; m < data[0].length; m++) {
          Averagedata[k] += data[i][m];
          //console.log("现在的j值",j,"现值",Averagedata[k])
          if (j == 10) {
            Averagedata[k] = Averagedata[k] / 10;
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
        var max = Math.max.apply(null, Averagedata);
        //console.log("最大值", max);
        for (var j = 0; j < data[0].length / 10; j++) {
          var y = i,
            x = j;
          datatemp[count] = [x, y, Averagedata[j]];
          count++;
        }
      }

      this.datam = datatemp.map(function (item) {
        return [item[0], item[1], item[2] || "-"];
      });

      var color = [];
      color[8] = new Array();
      color[9] = new Array();
      color[10] = new Array();
      // color[8]=["#008B00","#00CD66","#00EE00","#00FA9A","#CCFF99"]
      // color[10]=["#008B00","#00CD66","#00EE00","#00FA9A","#CCFF99","#FFDEAD","#FFA54F","#FF8C00","#FF4500","#FF3030"]
      // color[9]=["#00EE00","#00FA9A","#CCFF99","#FFDEAD","#FFA54F","#FF8C00",]
      this.myChart = echarts.init(this.$refs.Chart);
      var option = {
        grid: {
          left: "60px",
          right: "10px",
          top: "10px",
          bottom: "20px",
        },
        // tooltip: {
        //   position: "right",
        //   formatter: function (params) {
        //     return (
        //       params.seriesName +
        //       " :<br/>" +
        //       "第" +
        //       (params.data[1] + 1) +
        //       "个神经元" +
        //       " " +
        //       "第" +
        //       (params.data[0] + 1) +
        //       "个时间步" +
        //       " :<br/>" +
        //       "激活值：" +
        //       params.data[2]
        //     );
        //   },
        // },
        xAxis: {
          type: "category",
          data: datax,
          show: true,
        },
        yAxis: {
          type: "category",
          data: datay,
          show: true,
        },

        visualMap: {
          min: -0.1,
          max: 0.1,
          show: false,
          inRange: {
            // color:['#516b91','#d95850']
            //  color:['#516b91','steelblue','cornflowerblue','mediumpurple','tomato','tan','#d95850','peru']
            color: [
              "#5470c6",
              "LightSkyBlue",
              "LightBLue",
              "PapayaWhip",
              "Coral",
            ],
          },
        },
        series: [
          {
            name: "Punch Card",
            type: "heatmap",
            data: this.datam,
            label: {
              show: false,
            },
            itemStyle: {
              // shadowBlur: 10,
              width: "1px",
              height: "1px",
              borderRadius: [15, 15, 15, 15],
            },
          },
        ],
      };
      option && this.myChart.setOption(option);
      let erd = elementResizeDetectorMaker();
      let that = this;
      erd.listenTo(document.getElementById("Chart"), function (element) {
        that.$nextTick(function () {
          this.myChart.resize();
        })
      })
    },
  },
  mounted () {
    this.getData();
    // console.time("多线程热力图渲染时间");
    // this.$worker
    //   .run(() => {

    //     var xhr = new XMLHttpRequest();
    //     var str;
    //     xhr.open("GET", "http://127.0.0.1:5000//model/mul_line_chart", false);
    //     xhr.onreadystatechange = function() {
    //       str = JSON.parse(xhr.responseText);
    //       //console.log("利用XML从后端获取的数据", str);
    //     };
    //     xhr.send();
    //     var data = str.hidden_value[0];
    //     var datatemp = [];
    //     var datax = [];
    //     var datay = [];
    //     for (var i = 0; i < data.length; i++) {
    //       datay[i] = "神经元" + i;
    //     }
    //     for (var i = 0; i < 500; i++) {
    //       datax[i] = i;
    //     }
    //     var x_length = data.length;
    //     var count = 0;
    //     console.log("一共多少个神经元：");
    //     console.log(x_length);
    //     console.log("一共多少个时间步：");
    //     console.log(data[0].length);

    //     for (var i = 0; i < data.length; i++) {
    //       var Averagedata = [0];
    //       var j = 1;
    //       var k = 0;
    //       var res = 0;
    //       res = data[0].length % 10;
    //       for (var m = 0; m < data[0].length; m++) {
    //         Averagedata[k] += data[i][m];
    //         //console.log("现在的j值",j,"现值",Averagedata[k])
    //         if (j == 10) {
    //           Averagedata[k] = Averagedata[k] / 10;
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
    //       var max = Math.max.apply(null, Averagedata);
    //       //console.log("最大值", max);
    //       for (var j = 0; j < data[0].length / 10; j++) {
    //         var y = i,
    //           x = j;
    //         datatemp[count] = [x, y, Averagedata[j]];
    //         count++;
    //       }
    //     }

    //     const datam = datatemp.map(function(item) {
    //       return [item[0], item[1], item[2] || "-"];
    //     });
    //     console.log("能有什么不一样？", datatemp);
    //     console.log("处理后的数据为：");
    //     console.log(datam);
    //     var color = [];
    //     color[8] = new Array();
    //     color[9] = new Array();
    //     color[10] = new Array();
    //     // color[8]=["#008B00","#00CD66","#00EE00","#00FA9A","#CCFF99"]
    //     // color[10]=["#008B00","#00CD66","#00EE00","#00FA9A","#CCFF99","#FFDEAD","#FFA54F","#FF8C00","#FF4500","#FF3030"]
    //     // color[9]=["#00EE00","#00FA9A","#CCFF99","#FFDEAD","#FFA54F","#FF8C00",]
    //     //var myChart = echarts.init(this.$refs.Chart);
    //     var option = {
    //       grid: {
    //         left: "60px",
    //         right: "10px",
    //         top: "10px",
    //         bottom: "20px",
    //       },
    //       tooltip: {
    //         position: "right",
    //         // formatter: function(params) {
    //         //   return (
    //         //     params.seriesName +
    //         //     " :<br/>" +
    //         //     "第" +
    //         //     (params.data[1] + 1) +
    //         //     "个神经元" +
    //         //     " " +
    //         //     "第" +
    //         //     (params.data[0] + 1) +
    //         //     "个时间步" +
    //         //     " :<br/>" +
    //         //     "激活值：" +
    //         //     params.data[2]
    //         //   );
    //         // },
    //       },
    //       xAxis: {
    //         type: "category",
    //         data: datax,
    //         show: true,
    //       },
    //       yAxis: {
    //         type: "category",
    //         data: datay,
    //         show: true,
    //       },

    //       visualMap: {
    //         min: -0.1,
    //         max: 0.1,
    //         show: false,
    //         inRange: {
    //           // color:['#516b91','#d95850']
    //           //  color:['#516b91','steelblue','cornflowerblue','mediumpurple','tomato','tan','#d95850','peru']
    //           color: [
    //             "#5470c6",
    //             "LightSkyBlue",
    //             "LightBLue",
    //             "PapayaWhip",
    //             "Coral",
    //           ],
    //         },
    //       },
    //       series: [
    //         {
    //           name: "Punch Card",
    //           type: "heatmap",
    //           data: datam,
    //           label: {
    //             show: false,
    //           },
    //           itemStyle: {
    //             // shadowBlur: 10,
    //             width: "1px",
    //             height: "1px",
    //             borderRadius: [15, 15, 15, 15],
    //           },
    //         },
    //       ],
    //     };
    //     //option && myChart.setOption(option);

    //     return option;
    //   })
    //   .then((option) => {
    //     var myChart = echarts.init(this.$refs.Chart);
    //     option && myChart.setOption(option);
    //     console.timeEnd("多线程热力图渲染时间");
    //   });
  },
};
</script>

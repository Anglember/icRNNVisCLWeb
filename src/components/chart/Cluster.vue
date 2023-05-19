<template>
  <div
  :style="{height:height}"
    ref="echarts"
    id="echarts"
  ></div>
</template>

<script>
import * as echarts from "echarts";
let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "Scatter",
  props: {
    data: {
      default: " ",
    },
    methods: {
      default: " ",
    },
    mapping: {
      default: " ",
    },
    ResizeData: {
      type: Number,
    },
    height:String
  },
  data() {
    return {
      myChart:null
    };
  },
  watch:{
    ResizeData(newval) {
      this.myChart.resize();
    },
  },
  mounted() {
    this.$nextTick(()=>{
      // console.log("神经元陆磊试图没有啊？")
      this.drawLine();
    })
  },
  methods: {
    drawLine() {
      console.log("神经元聚类展示1111111111111111");
      var Cluster = [];
      for (var i = 0; i < 2; i++) {
        Cluster[i] = new Array();
        for (var j = 0; j < 6; j++) {
          Cluster[i][j] = new Array();
          for (var k = 0; k < 20; k++) {
            Cluster[i][j][k] = new Array();
          }
        }
      }
      for (var i = 0; i < 15; i++) {
        Cluster[0][0][i][0] = Math.random() * 12 + -12;
        Cluster[0][0][i][1] = Math.random() * -10 + -5;
      }
      for (var i = 0; i < 15; i++) {
        Cluster[1][0][i][0] = Math.random() * 12 + -12;
        Cluster[1][0][i][1] = Math.random() * -10 + -5;
      }
      for (var i = 0; i < 16; i++) {
        Cluster[0][1][i][0] = Math.random() * 10 + -5;
        Cluster[0][1][i][1] = Math.random() * 10 + -10;
      }
      for (var i = 0; i < 16; i++) {
        Cluster[1][1][i][0] = Math.random() * 10 + -5;
        Cluster[1][1][i][1] = Math.random() * 10 + -10;
      }
      for (var i = 0; i < 18; i++) {
        Cluster[0][2][i][0] = Math.random() * 10 + -5;
        Cluster[0][2][i][1] = Math.random() * 10 + 0;
      }
      for (var i = 0; i < 18; i++) {
        Cluster[1][2][i][0] = Math.random() * 10 + -5;
        Cluster[1][2][i][1] = Math.random() * 10 + 0;
      }
      for (var i = 0; i < 16; i++) {
        Cluster[0][3][i][0] = Math.random() * 10 + 5;
        Cluster[0][3][i][1] = Math.random() * 10 + -10;
      }
      for (var i = 0; i < 16; i++) {
        Cluster[1][3][i][0] = Math.random() * 10 + 5;
        Cluster[1][3][i][1] = Math.random() * 10 + -10;
      }
      for (var i = 0; i < 17; i++) {
        Cluster[0][4][i][0] = Math.random() * 6 + 2;
        Cluster[0][4][i][1] = Math.random() * 10 + -5;
      }
      for (var i = 0; i < 17; i++) {
        Cluster[1][4][i][0] = Math.random() * 6 + 2;
        Cluster[1][4][i][1] = Math.random() * 10 + -5;
      }
      for (var i = 0; i < 18; i++) {
        Cluster[0][5][i][0] = Math.random() * 5 + -12;
        Cluster[0][5][i][1] = Math.random() * 10 + -5;
      }
      for (var i = 0; i < 18; i++) {
        Cluster[1][5][i][0] = Math.random() * 5 + -12;
        Cluster[1][5][i][1] = Math.random() * 10 + -5;
      }
      //console.log("爱你孤身走暗巷", Cluster);
      var my_color = [
        "#37A2DA",
        "#e06343",
        "#37a354",
        "#b55dba",
        "#b5bd48",
        "#8378EA",
      ];
      var series = [];
      for (var i = 0; i < 6; i++) {
        series.push({
          name: "cluster" + i.toString,
          type: "scatter",
          symbolSize: 6,
          lineStyle: { width: 1 },
          data: Cluster[0][i],
          itemStyle: {
            color: my_color[i],
          },
        });
        series.push({
          name: "cluster" + i.toString,
          type: "scatter",
          symbolSize: 6,
          symbol: "triangle",
          lineStyle: { width: 1 },
          data: Cluster[1][5 - i],
          itemStyle: {
            color: my_color[i],
          },
        });
      }
      this.myChart = echarts.init(this.$refs.echarts);
      var option = {
        legend: {
          orient: "verticalAlign",
          right: 0,
          top: "middle",
          itemWidth: 5,
          itemHeight: 4,
          itemGap: 3,
          textStyle: {
            fontSize: 10,
          },
          show: false,
        },
        grid: {
        },
        xAxis: {},
        yAxis: {},
        series: series,
      };
      option && this.myChart.setOption(option);
      let erd = elementResizeDetectorMaker();
      let that = this;
      erd.listenTo(document.getElementById("echarts"), function (element) {
        that.$nextTick(function () {
          this.myChart.resize();
        })
      })
    },
  },
};
</script>
<style lang="less" scoped>
</style>


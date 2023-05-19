<template>
    <div style="width: 100%; height: 100%;background-color: white;" ref="echarts" id="echarts"></div>
    <!-- <div
      style="position:absolute;z-index:0;width:80px;height:100px;left:10px;top:95px;transform: skew(0, -30deg);background-color:#E0E0E0;opacity:1;border-style: solid;border-color: black;border-width: 1px;">
    </div>
    <div
      style="position:absolute;z-index:0;width:95px;height:130px;left:129px;top:45px;transform: skew(0, -30deg);background-color:#E0E0E0;opacity:1;border-style: solid;border-color: black;border-width: 1px;">
    </div> -->
</template>

<script>
import * as echarts from "echarts";
let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "Model",
  props: {
    dataSource: {
      default: " ",
    },
    edgeInfo: Array,
    nodeInfo: Array,
    methods: {
      default: " ",
    },
    mapping: {},
    Interact: {
      type: Object,
    },
    height:String
  },
  data () {
    return {
      dataSets: {},
      dialogTableVisible: false,
      activeName: "first",
      myChart: null,
      echart: null,
      clickData: [],
      series: [],
      data: [],
    };
  },
  watch: {
    "Interact.checkList" (newval) {
      console.log("this.Interact.checkList", this.Interact)
      this.HandleInteract(newval);
    },
  },
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.drawLine()
        })
      })
    }, 0)
  },
  methods: {
    CreatNodes () {
      var arr = []
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          arr.push({
            name: "Node" + 0 + i + j,
            x: 100 + (i * 10),
            y: 150 - (i * 6) + j * 12,
            itemStyle:{
              color:"#84C1FF"
            }
          })
        }
      }
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          arr.push({
            name: "Node" + 1 + i + j,
            x: 220 + (i * 10),
            y: 150 - (i * 6) + j * 12,
            itemStyle:{
              color:"#84C1FF"
            }
          })
        }
      }
      return arr;
    },
    CreateEdges () {
      var arr = []
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          for (var l = 0; l < 10; l++) {
            for (var m = 0; m < 10; m++) {
              arr.push({
                source: "Node" + 0 + i + j,
                target: "Node" + 1 + l + m
              })
            }
          }
        }
      }
      return arr;
    },
    HandleClick () {
      this.myChart.on("click", (param) => {
        if (param.dataType === "node") {
          // 点击节点
          var num = Math.floor(Math.random() * (100 - 1) + 1);
          this.echart.setOption({
            grid: {
              left: "32px",
              right: "5px",
            },
            xAxis: {
              type: "category",
            },
            yAxis: {
              type: "value",
              data: ["-0.5", "-0.4", "-0.2", "0", "0.2", "0.4", "0.5"],
            },
            series: [
              {
                type: "line",
                data: this.clickData[num],
              },
            ],
          });
        }
      });
    },
    HandleInteract (newval) {
      if (newval[1] === true) {
        this.HandleClick();
      } else {
        this.myChart.off("click")
      }
      this.series = [
        {
          focusNodeAdjacency: newval[0], // 当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
          roam: newval[2],
          //draggable: newval[3], // 指示节点是否可以拖动
          //layout: "none",
          type: "graph",
        },
      ];
      var option = {
        series: this.series
      }
      this.myChart.setOption(option)
    },
    drawLine () {
      this.myChart = echarts.init(this.$refs.echarts);
      var option;
      var Nodedata = this.CreatNodes();
      var Edgedata = this.CreateEdges();
      this.series = [
        {
          emphasis: {
            focus: 'adjacency',
          },
          draggable: true, // 指示节点是否可以拖动
          type: "graph",
          layout: "none",
          symbolSize: 10,
          roam: false,
          edgeSymbolSize: [4, 10],
          data: Nodedata,
          edges: Edgedata,
          // links: [],
          lineStyle: {
            color: "gray",
            opacity: 1,
          }
        },
      ],
        option = {
          legend: {},
          series: this.series
        };
      this.myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>

</style>

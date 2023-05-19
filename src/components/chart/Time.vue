<template>

  <div class="Timeseries" :style="{height:height}" ref="echarts" id="echarts">
  </div>

</template>

<script>
import * as echarts from "echarts";
let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "Time",
  props: {
    data: {
      default: " ",
    },
    TimeData: {
      type: Object,
      checkList: [],
    },
    mapping: {
      type: Object,
    },
    Interact: {
      type: Object,
    },
    ResizeData: {
      type: Number,
    },
    height: String,//高度
  },
  data () {
    return {
      EpochName: [],
      BatchName: [],
      myChart: null,
      ColorData: [],
      //EpochColor:[],
    };
  },
  watch: {
  },
  computed: {
  },
  mounted () {
  },
  created () {
    setTimeout(() => {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.drawLine()
        })
      })
    }, 0)
  },
  methods: {
    onResizing () {
      this.myChart.resize()
    },
    HandleInteract (newval) {
      // var bool = [false];
      // for (var i = 0; i < newval.length; i++) {
      //   switch (newval[i]) {
      //     case "悬浮-细节": bool[0] = true; break;
      //   }
      // }
      var option = {
        tooltip: {
          formatter: function (param) {
            return param.name;
          },
          show: newval[0]
        },
      }
      //bool = [false];
      this.myChart.setOption(option)
    },
    changeColor () {
      var newval = []
      newval[0] = this.mapping.Epoch1Color
      newval[1] = this.mapping.Epoch2Color
      newval[2] = this.mapping.Epoch3Color
      newval[3] = this.mapping.Epoch4Color
      newval[4] = this.mapping.Epoch5Color
      for (var i = 0; i < this.ColorData.length; i++) {
        this.ColorData[i].itemStyle.color = newval[i]
      }
      var series = {
        name: "EpochTime",
        type: "pie",
        radius: ["40%", "65%"],
        labelLine: {
          show: false,
          length: 15,
          length2: 5,
          borderWidth: 20,
          maxSurfaceAngle: 80,
        },
        data: this.ColorData,
      }
      var option = {
        series: series
      }
      this.myChart.setOption(option);
      this.myChart.resize
    },
    changeSelect (newval, EpochName, BatchName) {
      var bool = [false, false, false, false, false];
      var selected = {};
      for (var i = 0; i < newval.length; i++) {
        switch (newval[i]) {
          case "Epoch1":
            bool[0] = true;
            break;
          case "Epoch2":
            bool[1] = true;
            break;
          case "Epoch3":
            bool[2] = true;
            break;
          case "Epoch4":
            bool[3] = true;
            break;
          case "Epoch5":
            bool[4] = true;
            break;
        }
      }
      for (var i = 0; i < EpochName.length; i++) {
        selected[EpochName[i]] = bool[i]
        for (var j = 0; j < BatchName[i].length; j++) {
          selected[BatchName[i][j]] = bool[i]
        }
      }
      var option = {
        legend: {
          selected: selected,
          show: false
        }
      }
      this.myChart.setOption(option);
    },
    drawLine () {
      var Time = [
        {
          "name": "epoch1",
          "value": ["3", "2", "4", "7", "1", "4", "11", "5", "9", "2"]
        },
        {
          "name": "epoch2",
          "value": ["4", "1", "7", "11", "5", "8", "3", "2", "6", "5"]
        },
        {
          "name": "epoch3",
          "value": ["7", "3", "6", "3", "5", "12", "8", "6", "1", "3"]
        },
        {
          "name": "epoch4",
          "value": ["8", "4", "5", "10", "4", "8", "6", "2", "7", "2"]
        },
        {
          "name": "epoch5",
          "value": ["8", "1", "4", "6", "8", "11", "4", "6", "1", "4"]
        }
      ];
      this.myChart = echarts.init(this.$refs.echarts);
      var option;
      var series = [];
      var totalTime = 0;
      for (var i = 0; i < Time.length; i++) {
        for (var j = 0; j < Time[0].value.length; j++) {
          totalTime += Number(Time[i].value[j]);
        }
      }
      series.push({
        name: "TotalTime",
        type: "pie",
        radius: ["70%", "80%"],
        show: true,
        data: [
          {
            name: "训练时长" + ":" + totalTime + "s",
            value: totalTime,
          },
        ],
      });
      var epochdata = [];
      var color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
      var rotate = [-35, 70, 0, -70, 35];
      for (var i = 0; i < Time.length; i++) {
        var epochTime = 0;
        for (var j = 0; j < Time[0].value.length; j++) {
          epochTime += Number(Time[i].value[j]);
        }
        epochdata.push({
          name:
            Time[i].name +
            "<br/>" +
            "时长" +
            epochTime +
            "s" +
            "<br/>" +
            "占比" +
            ((epochTime / totalTime) * 100).toFixed(2) +
            "%",
          value: epochTime,
          itemStyle: {
            color: color[i],
          },
          label: {
            show: true,
            formatter:
              Time[i].name +
              "\n" +
              ((epochTime / totalTime) * 100).toFixed(2) +
              "%",
            position: "inside",
            rotate: rotate[i],
          },
        });
      }
      for (var i = 0; i < Time.length; i++) {
        this.EpochName[i] = epochdata[i].name;
      }

      series.push({
        name: "EpochTime",
        type: "pie",
        radius: ["40%", "65%"],
        labelLine: {
          show: false,
          length: 15,
          length2: 5,
          borderWidth: 20,
          maxSurfaceAngle: 80,
        },
        data: epochdata,
      });
      this.ColorData = epochdata;
      var batchdata = [];
      var count = 0;
      for (var i = 0; i < Time.length; i++) {
        for (var j = 0; j < Time[0].value.length; j++) {
          batchdata.push({
            name:
              "epoch" +
              (i + 1).toString() +
              " " +
              "批次" +
              (j + 1).toString() +
              "<br/>" +
              "时长" +
              Number(Time[i].value[j]) +
              "s" +
              "<br/>" +
              "占比" +
              (
                (Number(Time[i].value[j]) / epochdata[i].value) *
                100
              ).toFixed(2) +
              "%",
            value: Number(Time[i].value[j]),
          });
          count++;
        }
      }
      var countBatchdata = 0;
      for (var i = 0; i < Time.length; i++) {
        this.BatchName[i] = new Array();
        for (var j = 0; j < Time[i].value.length; j++) {
          this.BatchName[i][j] = batchdata[countBatchdata].name;
          countBatchdata++;
        }
      }
      series.push({
        name: "BatchTime",
        type: "pie",
        radius: ["10%", "30%"],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
          //formatter: Time[i].name+"占比"+(Number(Time[i].value)/total*100).toFixed(2)+"%",
        },
        data: batchdata,
      });
      option = {
        // tooltip: {
        //   formatter: function (param) {
        //     return param.name;
        //   },
        // },
        series: series,
      };
      //myChart.on('click',this.changeLable(param))
      this.myChart.setOption(option);
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

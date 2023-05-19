<template>
  <div ref="echarts" :style="{height:height}"></div>
</template>

<script>
import * as echarts from 'echarts';
let elementResizeDetectorMaker = require('element-resize-detector');
export default {
  name: 'ActValueCover',
  data () {
    return {
      hidden_layer: 0,
      dataSets: []
    };
  },
  props: {
    msg: String,
    data: {
      default: ' '
    },
    methods: {
      default: ' '
    },
    mapping: {
      default: ' '
    },
    ResizeData: {
      type: Number
    },
    height: String
  },
  watch: {
    ResizeData (newval) {
      this.myChart.resize();
    },
    hidden_layer: {
      handler (newVal, oldValue) {
        if (newVal != oldValue) {
          //alert(typeof(parseInt(newVal)))
          this.get_State_distri(parseInt(newVal));
        }
      }
    }
  },
  methods: {
    //////////////获取激活值覆盖率///////////
    async get_State_distri () {
      //alert('发起请求');
      await this.$http
        .get('http://127.0.0.1:5000//analysis/state_distri')
        .then(res => {
          //alert("进来了");
          this.drowstatecon(res.data);
          if (res.data.columns) {
            this.dataSets = res.data;

            this.drowstatecon(res.data);
          }
        })
        .catch(err => {
          //alert('请求失败')
        });
    },
    ////////画覆盖率////////
    drowstatecon (data) {
      this.myChart = echarts.init(this.$refs.echarts);
      var app = {};
      var option;
      var dataMap = {};
      var columns = data.columns;
      var bardata = new Object();
      var linedata = new Object();
      var timelinedata = [];
      var series = [];
      // console.log("bardata", bardata, timelinedata, linedata)

      // function dataFormatter (obj) {
      //     var temp;
      //     console.log("columns[0]",columns[0],"columns[columns.length]",columns[columns.length])
      //     for (var year = columns[0]; year <= columns[columns.length]; year++) {
      //     var max = 0;
      //     var sum = 0;
      //     temp = obj[year];
      //     for (var i = 0, l = temp.length; i < l; i++) {
      //         max = Math.max(max, temp[i]);
      //         sum += temp[i];
      //         obj[year][i] = {
      //         // name : pList[i],
      //         value: temp[i]
      //         }
      //     }
      //     obj[year + 'max'] = Math.floor(max / 100) * 100;
      //     obj[year + 'sum'] = sum;
      //     }
      //     console.log("year是什么",year)
      //     console.log("temp",temp)
      //     console.log("obj",obj)
      //     return obj;
      // }

      for (var i = 0; i < data.com2.length; i++) {
        bardata['bar' + i.toString()] = data.com2[i];
        //console.log("bardata是什么",)
        timelinedata.push(i.toString());
        //for (var j = 0; j < data.com.length; j++) {
        linedata['line' + i.toString()] = data.com[i];
        // }
      }
      // console.log("bardata是什么",bardata)
      // console.log("linedata是什么",linedata)
      // console.log("timelinedata是什么",timelinedata)
      // console.log("data.com2.length",data.com2.length)
      dataMap.databar = bardata;
      dataMap.dataline = linedata;

      for (var i = 0; i < data.com2.length; i++) {
        series.push({
          series: []
        });
        //for (var j = 0; j < data.com.length; j++) {
        series[i].series.push({
          animation: false,
          type: 'line',
          smooth: true,
          data: dataMap.dataline['line' + i.toString()][0],
          xAxisIndex: 1,
          yAxisIndex: 1
        });
        //}
        series[i].series.push({
          type: 'bar',
          color: '#9e0909',
          data: dataMap.databar['bar' + i.toString()]
        });
      }
      // console.log(series)
      option = {
        timeline: {
          axisType: 'category',
          autoPlay: true,
          playInterval: 1000,
          data: ['10', '50', '100', '500', 'End'],
          width: '80%',
          left: '10%',
          height: '5%',
          bottom: '7%'
        },
        legend: {},
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            itemSize: 10
          },
          top: 1
        },
        tooltip: {
          axisPointer: {
            animation: true
          },
          transitionDuration: 0
        },
        xAxis: [
          { type: 'category', gridIndex: 0 },
          { type: 'category', gridIndex: 1 }
        ],
        // dataZoom: [
        //   {
        //     type:"slider",
        //     height:'1%',
        //     xAxisIndex: 1,
        //   },
        // ],
        yAxis: [
          {
            gridIndex: 0,
            type: 'value',
            max: 100,
            min: 0
          },
          {
            gridIndex: 1,
            type: 'value',
            max: 'dataMax',
            show: false
          }
        ],
        grid: [
        ],
        series: series
      };
      this.myChart.setOption(option);
    },
  },
  mounted () {
    this.get_State_distri(parseInt(this.hidden_layer));
    //this.drawChart();
  }
};
</script>

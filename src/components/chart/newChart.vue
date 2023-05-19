<template>
  <div :id="elId" class="charts" :style="{height:height}">
  </div>
</template>

<script>
import Echarts from 'echarts'
//引入uuid文件
import uuidv1 from 'uuid/v1'
let elementResizeDetectorMaker = require("element-resize-detector");

//监听元素变化
export default {
  name: "charts",
  data () {
    return {
      elId: '',
      myChart: {},
    }
  },
  props: {
    height: String,//高度
    time: Array, //x轴的显示数据，参数名可以自己定义；
    opData: Array, //用来配置series的系列列表，参数可以自己定义；
    unit: String, //y轴单位显示，参数可以自己定义；
    title: Array
  },
  created () {
    this.elId = uuidv1() //获取随机id
    //延迟加载，解决vue-grid-layout中echarts不显示问题
    setTimeout(() => {
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.SetEchart()
        })
      })
    }, 0)
  },
  mounted () {
    //监听元素变化
    let erd = elementResizeDetectorMaker();
    let that = this;
    erd.listenTo(document.getElementById(this.elId), function (element) {
      that.$nextTick(function () {
        let myChart = that.$echarts.init(document.getElementById(that.elId));
        //使echarts尺寸重置
        myChart.resize();
      })
    })
  },
  computed: {

  },
  methods: {
    SetEchart () {
      let myChart = this.$echarts.init(document.getElementById(this.elId))
      // 绘制图表
      var option = {
        title: {
          text: '成本（单位:元）',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: ['总费1', '总费2', '总费3', '总费4', '总费5', '总费6']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '辅助',
            type: 'bar',
            stack: '总量',
            itemStyle: {
              normal: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              },
              emphasis: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
              }
            },
            data: [0, 1700, 1400, 1200, 300, 0]
          },
          {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'inside'
              }
            },
            data: [3900, 2200, 300, 200, 900, 300]
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.bm-view
  width 100%
</style>

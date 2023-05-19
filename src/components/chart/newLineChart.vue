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
    titleText: {
      type: String,
      default: '图表名称'
    },
    xArray: {
      type: Array,
      default: function () {
        return [];
      }
    },
    seriesData: {
      type: Array,
      default: function () {
        return [820, 932, 901, 934, 1290, 1330, 1320];
      }

    }
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
  watch: {
    titleText: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.SetEchart()
    },
    xArray: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.SetEchart()
    },
    seriesData: function (newVal, oldVal) {
      console.log(newVal, oldVal)
      this.SetEchart()
    }

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
          text: this.titleText,
          left: 'center',
          textStyle: {
            fontSize: 16
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.xArray
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.seriesData,
          type: 'line',
          smooth: true
        }]
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

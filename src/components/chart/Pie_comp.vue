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
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '90%'],
            itemStyle: {
              borderRadius: 50,
              borderColor: 'white',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1048, name: 'Search Engine',
                itemStyle: {
                  color: '#5470c6'
                }
              },
              {
                value: 735, name: 'Direct', itemStyle: {
                  color: 'LightSkyBlue'
                }
              },
              {
                value: 580, name: 'Email', itemStyle: {
                  color: 'LightBLue'
                }
              },
              {
                value: 484, name: 'Union Ads', itemStyle: {
                  color: 'PapayaWhip'
                }
              },
              {
                value: 300, name: 'Video Ads', itemStyle: {
                  color: 'Coral'
                }
              }
            ]
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

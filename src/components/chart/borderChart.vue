<template>
  <div :id="elId" class="charts" :style="{height:height}">
  </div>
</template>

<script>
import Echarts from 'echarts'
//引入uuid文件
import uuidv1 from 'uuid/v1'
let elementResizeDetectorMaker = require("element-resize-detector");
import 'echarts/theme/shine'
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
      let myChart = this.$echarts.init(document.getElementById(this.elId), "shine")
      // 绘制图表
      var option = {
        title: {
          text: '饼图',
          left: 'center',
          //   textStyle: {
          //     // color: '#FFFFFF',
          //     fontSize: '150%'
          //   }

        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['数据1', '数据2', '数据3', '数据4', '数据5']
        },
        series: [
          {
            name: '测试',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '数据1' },
              { value: 310, name: '数据2' },
              { value: 234, name: '数据3' },
              { value: 135, name: '数据4' },
              { value: 1548, name: '数据5' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
.charts {
    background-image: url('../../assets/img/zuo2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* background-color: rgb(11, 18, 46); */
}
</style>

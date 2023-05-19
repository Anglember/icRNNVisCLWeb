<template>
  <div :id="elId" class="charts" :style="{ height: height }">
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
    title: Array,
    datasource: Array,
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
    datasource (newval) {
      // console.log("data",this.$store.state.Alldata[newval].data)
      console.log("heihei", newval)
      this.draw(newval)
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
    draw (data) {
      var my_color = ["CornflowerBlue", "CadetBlue"];
      var series = [];
      var datax = [];
      for (var i = 0; i < data[0].length; i++) {
        datax[i] = i + 1;
      }
      var linename = ["RealData", "PredictData"];
      for (let i = 0; i < data.length; i++) {
        series.push({
          type: "line",
          smooth: true,
          name: linename[i],
          showSymbol: false,
          color: my_color[i],
          data: data[i],
        });
      }
      let myChart = this.$echarts.init(document.getElementById(this.elId))
      myChart.clear();
      var option = {
        grid: {
          left: "8%",
          // right:'10%',
          bottom: "12%",
          width: "89%",
          top: "5%",
          height: "80%",
        },
        toolbox: {
          feature: {
            dataZoom: {},
          },
          top: "-2%",
          right: "2%",
        },
        dataZoom: [
          {
            height: "10%",
            bottom: "5%",
            left: "4%",
            type: "slider",
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
          max: "dataMax",
          min: Math.min.apply(null, data[0])
        },
        series: series,
      };
      myChart.setOption(option)
    },
    SetEchart () {
      let myChart = this.$echarts.init(document.getElementById(this.elId))
      // 绘制图表
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: 'black'
            }
          }
        },
        series: [
          {
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210],
            itemStyle: {
              color: "LightSkyBlue"
            }
          },
          {
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310],
            itemStyle: {
              color: "Coral"
            }
          },
        ]
      }
      myChart.setOption(option);
    }
  }
};
</script>


<template>
  <div :id="elId" class="charts" :style="{ height: height }"></div>
</template>

<script>
import Echarts from 'echarts';
//引入uuid文件
import uuidv1 from 'uuid/v1';
let elementResizeDetectorMaker = require('element-resize-detector');

//监听元素变化
export default {
  name: 'charts',
  data() {
      return {
          elId: '',
          myChart: {}
      };
  },
  props: {
      height: String, //高度
      time: Array, //x轴的显示数据，参数名可以自己定义；
      opData: Array, //用来配置series的系列列表，参数可以自己定义；
      unit: String, //y轴单位显示，参数可以自己定义；
      title: Array
  },
  created() {
      this.elId = uuidv1(); //获取随机id
      //延迟加载，解决vue-grid-layout中echarts不显示问题
      setTimeout(() => {
          this.$nextTick(() => {
              this.$nextTick(() => {
                  this.SetEchart();
              });
          });
      }, 0);
  },
  mounted() {
      //监听元素变化
      let erd = elementResizeDetectorMaker();
      let that = this;
      erd.listenTo(document.getElementById(this.elId), function(element) {
          that.$nextTick(function() {
              let myChart = that.$echarts.init(document.getElementById(that.elId));
              //使echarts尺寸重置
              myChart.resize();
          });
      });
  },
  computed: {},
  methods: {
      SetEchart() {
          let myChart = this.$echarts.init(document.getElementById(this.elId));
          // 绘制图表
          var option = {
              series: [
                  {
                      type: 'graph',
                      layout: 'none',
                      symbolSize: 20,
                      roam: true,
                      label: {
                          show: false
                      },
                      edgeSymbol: ['circle', 'arrow'],
                      edgeSymbolSize: [4, 10],
                      edgeLabel: {
                          fontSize: 10
                      },
                      data: [
                          {
                              name: 'Node 1',
                              x: 30,
                              y: 30,
                              itemStyle:{
                                color:'LightBLue'
                              }
                          },
                          {
                              name: 'Node 2',
                              x: 80,
                              y: 30,
                              itemStyle:{
                                color:'Coral'
                              }
                          },
                          {
                              name: 'Node 3',
                              x: 55,
                              y: 10,
                              itemStyle:{
                                color:'LightSkyBlue'
                              }
                          },
                          {
                              name: 'Node 4',
                              x: 55,
                              y: 50,
                              itemStyle:{
                                color:'LightSkyBlue'
                              }
                          }
                      ],
                      // links: [],
                      links: [
                          {
                              source: 'Node 1',
                              target: 'Node 3'
                          },
                          {
                              source: 'Node 3',
                              target: 'Node 2'
                          },
                          {
                              source: 'Node 4',
                              target: 'Node 2'
                          },
                          {
                              source: 'Node 1',
                              target: 'Node 4'
                          }
                      ],
                      lineStyle: {
                          opacity: 0.9,
                          width: 2,
                          curveness: 0
                      }
                  }
              ]
          };
          myChart.setOption(option);
      }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>

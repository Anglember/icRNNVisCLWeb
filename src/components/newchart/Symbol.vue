<template>
  <div :id="elId" class="charts" style="height: 274px"></div>
</template>

<script>
import Echarts from 'echarts';
//引入uuid文件
import uuidv1 from 'uuid/v1';
let elementResizeDetectorMaker = require('element-resize-detector');

//监听元素变化
export default {
  name: 'charts',
  data () {
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
  created () {
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
  mounted () {
    //监听元素变化
    let erd = elementResizeDetectorMaker();
    let that = this;
    erd.listenTo(document.getElementById(this.elId), function (element) {
      that.$nextTick(function () {
        let myChart = that.$echarts.init(document.getElementById(that.elId));
        //使echarts尺寸重置
        myChart.resize();
      });
    });
  },
  computed: {},
  methods: {
    CreateObject (k) {
      var s = "{";
      for (var i = 0; i <= k; i++) {
        if (i == k) {
          s += "value:20";
        }
        else {
          s += "children:[{"
        }
      }
      for (var i = 0; i <= k; i++) {
        if (i == k)
          s += "}"
        else {
          s += "}]"
        }
      }
      // console.log(s)
      var obj = eval("(" + s + ")")
      // console.log(obj)
      // console.log(typeof(obj))
      return obj
    },
    SetEchart () {
      let myChart = this.$echarts.init(document.getElementById(this.elId));
      var symbols = ["A", "B", "C", "D"];
      var s = "ABCD";
      // var my_color = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9']
      var ring = [];
      var series = []
      // console.log(s)
      // console.log(typeof(s))
      for (var j = 0; j < s.length; j++) {
        var symbol;
        //symbol=this.IndexOf(s[j])
        symbol = symbols.indexOf(s[j])
        //console.log("数据啥样的"+typeof(symbol)+symbol);
        //console.log(symbol)
        /////////////对应图符标识添加data////////////
        var obj = this.CreateObject(symbol)
        // obj.push({ itemStyle: { color: my_color[j] } })
        // console.log("1", obj)
        ring.push(obj)
      }
      // console.log(ring)
      var option;
      option = {
        title: {
          text: '符号ABCD',
          left: 13,
          top: 50,
          textStyle: {
            color: '#E6A23C'
          }
        },
        series: series
      };
      series.push({
        name: "sun", type: 'sunburst', radius: ['15%', '80%'],
        label: { show: false }, data: ring, nodeClick: false
      })
      myChart.setOption(option);
    }
  }
};
</script>


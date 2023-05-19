<template>
  <div id="MySunbrustcharts" style="position:absolute;width:100%;height:99%;border:1px dashed #9fc5e8">
  </div>
</template>
<script>
var echarts = require("echarts");
export default ({
  name: "BipartedGragh",
  data () {
    return {
      dataSets: {
        symbolic_data: {},
        symbols: [],
        units_data: {},
        link_value: {}
      },
      itemcount: [1, 2, 3, 4],
      Symbolic_counts: 4,
      countx: [],
      county: [],
      unitsflag: [0, 0, 0],
      Saxflag: [],
    }
  },
  computed: {
    //用于存储点击神经单元的位置[0,1,2,8,3]
    //表示第一簇中第2个隐藏单元对第0簇中符号簇的激活值每行排列8个热力矩阵共三行
    reSize () {
      //console.log("bianhual ")
      //console.log(this.$store.state.unitsflag)
      return this.$store.state.reSize
    }
  },
  watch: {
    reSize (newval) {
      console.log($("#MySunbrustcharts"))
      console.log("二部图要更新了")
      $("#MySunbrustcharts").empty();
      console.log($("#MySunbrustcharts"))
      this.Draw_Gragh()
    },
  },
  props: {
    dataSource: {
      default: "Processed"
    }
  },
  mounted () {
    console.log("hhhhhhhhhhh")
    this.getData()
    this.$on('success', (() => {
      console.log("我是旭日图组件，我已经拿到父组件的数据了")
      console.log(this.dataSets.symbolic_data)
      //console.log("到最后，必然是我运筹帷幄")
      //console.log(this.dataSets.symbols)
      this.Draw_Gragh()
    }))
  },
  methods: {
    ///////////获取父组件数据//////////////
    getData () {
      this.$parent.$on('Msg got', (() => {
        console.log("我来取数据了")
        console.log(this.$parent)
        this.dataSets.symbolic_data = this.$parent.dataSets.Biparted.symbolic_data;
        this.dataSets.units_data = this.$parent.dataSets.Biparted.units_data;
        this.dataSets.link_value = this.$parent.dataSets.Biparted.link_value;
        this.dataSets.symbols = this.$parent.dataSets.Biparted.symbols;
        console.log("父组件聚类数据为：")
        console.log(this.$parent.dataSets.symbolic_data);
        this.$emit('success')
      }))
    },
    /////////////用于生成对应符号化元素的对象///////////////
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
    ////////////计算字符在字符数组中所在位置，为形成字符环形//////////
    IndexOf (s) {
      for (var i = 0; i < this.dataSets.symbols.length; i++) {
        if (s == this.dataSets.symbols[i])
          return 0;
      }
    },
    ClickDiv (g) {
      alert("点击我")
      this.Draw_Heatmap(g)
      this.Draw_Line(g)
    },
    /////////生成每个簇的series///////
    Draw_Gragh () {
      console.log("开始循环吧")
      var height = 100 / this.dataSets.symbolic_data.length
      var divtop = 0, divheight; this.county[0] = 0;
      ////////////对每个簇进行循环遍历//////////
      for (var g = 0; g < this.dataSets.symbolic_data.length; g++) {
        ////////////series用于存储每个簇的data,count用于记录每个簇有几行图符
        ////////////countx用于记录每行有多少个元素////////
        var series1 = [], series2 = []; this.county[g + 1] = 1; this.countx[g + 1] = 0;//var county=1;var countx=0;
        ///////////data1,data2分别用于存储每一簇的特征图符和激活值
        var data1 = this.dataSets.symbolic_data[g];
        //console.log("这是什么捏",data1)
        //var data2=this.dataSets.units_data[0][g];
        //var data2=this.dataSets.units_data[g]
        // console.log("传输过来的数据有：")
        // console.log(data)
        ////////////x,y用于记录簇中每个图符的位置,r标识图符大小////////
        var r = height * 0.45; var ra = r + ""; var x = r * 1 / 2, y = r; var xaix, yaix;
        var my_color = ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9']
        ///////////对簇中每个符号化元素进行处理//////////
        for (var i = 0; i < data1.length; i++) {
          var s = data1[i];
          var ring = [];
          // console.log(s)
          // console.log(typeof(s))
          if (typeof (s) == "number")
            break
          for (var j = 0; j < s.length; j++) {
            var symbol;
            //symbol=this.IndexOf(s[j])
            symbol = this.dataSets.symbols.indexOf(s[j]) + 1
            //console.log("数据啥样的"+typeof(symbol)+symbol);
            //console.log(symbol)
            /////////////对应图符标识添加data////////////
            var obj = this.CreateObject(symbol)
            ring.push(obj)
          }
          //console.log(ring)
          ///////////center用于图符定位/////////////
          xaix = x + '%', yaix = y//yaix=y+'%';
          var center = [xaix, yaix]
          series1.push({
            name: g, type: 'sunburst', radius: ra,
            label: { show: false }, data: ring, center: center, nodeClick: false
          })
          x = x + r;
          if (this.county[g + 1] == 1)
            this.countx[g + 1]++;
          ///////////超出div大小则从头排列//////////
          if (x > 100) {
            x = r * 1 / 2;
            y = y + r * 2;
            this.county[g + 1]++;
          }
        }
        // console.log("纵向为："+this.county[g+1])
        // console.log("横向有："+this.countx[g+1])
        this.countx[0] += this.countx[g + 1];
        this.county[0] += this.county[g + 1];
        /////////添加div元素/////////
        ////添加div元素
        var divheight = height * this.county[g + 1] / 3;
        //console.log("半径为："+r)
        //console.log("county为："+county)
        // console.log("高度为："+divheight)
        // console.log("Top值为："+divtop)
        var name1 = "MySunbrustcharts" + g;
        var name2 = "MySunbrustcharts" + g + g;
        var childrendiv1 = "<div id='" + name1 + "' style='position:absolute;top:" + divtop + "%;width:40%;height:" + divheight + "%;border:1px solid #d9ead3;border-radius:10px' @click='ClickDiv(" + g + ")'></div>";
        var childrendiv2 = "<div id='" + name2 + "' style='position:absolute;top:" + divtop + "%;width:39%;left:60%;height:" + divheight + "%;border:1px solid #d9ead3;border-radius:10px'></div>";
        $('#MySunbrustcharts').append(childrendiv1)
        $('#MySunbrustcharts').append(childrendiv2)
        this.Draw_Sunbrust(series1, name1)
        divtop = divtop + divheight + 0.9;
      }
      this.Draw_Heatmap(0);
      this.Draw_Line(0);
      //this.Draw_Line(0);
    },
    Draw_Sunbrust (series, name,) {
      ////对于每一簇的数据进行处理
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      // var myChart = echarts.init(this.$refs[name]);
      var option;
      option = {
        series: series
      };
      myChart.on('click', (params) => {
        if (params.componentType === 'series') {
          // console.log("cluster:", clickinput);
          // console.log("index:", params.seriesIndex);
          // console.log("symbol:", input_cluster[clickinput][params.seriesIndex]);
          //saxColumnsShow.push(input_cluster[clickinput][params.seriesIndex]);
          //drowE_line(saxColumnsShow);
          console.log(params)
          //console.log(g)
          // console.log(parseInt(params.seriesName))
          // console.log(this)
          //this.Draw_Line(parseInt(params.seriesName))
          this.Draw_Heatmap(parseInt(params.seriesName))
          this.Draw_Line(parseInt(params.seriesName))
        }
        //////点击图符画折线图////////
        this.saxflag = Object.values(this.$store.state.Saxflag)
        // console.log("有输出不")
        // console.log(this.saxflag)
        // console.log(typeof(this.saxflag))
        // console.log(Object.values(this.saxflag))
        this.saxflag.push([parseInt(params.seriesName), params.seriesIndex])
        this.$store.commit('newSaxflag', this.saxflag)
      })
      option && myChart.setOption(option);
    },
    Draw_Heatmap (flag) {
      var datatemp = this.dataSets.units_data[flag];
      /////////datax,datay分别用于存储横纵坐标值,data用于存储处理后的值/////////
      // console.log("现在画的是"+flag+"号元素")
      for (var g = 0; g < this.dataSets.symbolic_data.length; g++) {
        //var datas=datatemp[g];
        var datas = datatemp[g];
        var countx = this.countx[g + 1], county = this.county[g + 1]
        var datax = [], datay = [], data = [];
        for (var i = 0; i < countx; i++) {
          datax[i] = i;
        }
        for (var i = 0; i < county; i++) {
          datay[i] = i;
        }
        for (var i = 0; i < datas.length; i++) {
          var x = i % countx, y = county - parseInt(i / countx) - 1
          data[i] = [x, y, datas[i]];
        }
        // console.log("横坐标包括：")
        // console.log(datax);
        // console.log("纵坐标包括：")
        // console.log(datay);
        const datam = data.map(function (item) {
          return [item[0], item[1], item[2] || '-'];
        });
        // console.log("处理后的数据为：")
        // console.log(data);
        var name = "MySunbrustcharts" + g + g;
        var chartDom = document.getElementById(name);
        var myChart = echarts.init(chartDom);
        var option = {
          grid: {
            height: '80%',
            width: '90%',
            left: '2',
            top: '2'
          },
          xAxis: {
            type: 'category',
            data: datax,
            show: false
          },
          yAxis: {
            type: 'category',
            data: datay,
            show: false
          },
          visualMap: {
            min: -0.1,
            max: 0.1,
            show: false,
            inRange: {
              color: ['blue', 'red']
            }
          },
          series: [
            {
              name: g,
              type: 'heatmap',
              data: datam,
              label: {
                show: false,
              },
            }
          ]
        };
        myChart.on("click", (param) => {
          this.unitsflag = [flag, parseInt(param.seriesName), param.dataIndex, this.countx[flag + 1], this.county[flag + 1]]
          console.log("我现在点击的是：")
          console.log(this.unitsflag)
          this.$store.commit('newUnitsflag', this.unitsflag)
        })
        option && myChart.setOption(option);
      }
    },
    Draw_Line (flag) {
      // console.log("我被点击了")
      var data = this.dataSets.link_value[flag]
      var childrendiv = "<div id='Line' style='position:absolute;left:40%;width:20%;height:100%;'></div>";
      $('#MySunbrustcharts').append(childrendiv)
      var chartDom = document.getElementById('Line');
      var myChart = echarts.init(chartDom);
      var option;
      var series = []
      //var max=data.length;var datas=[]
      var max = this.county[0];
      //sum用于计算当前簇的位置
      var sum = 0;
      for (var i = 0; i <= flag; i++) {
        sum += this.county[i + 1];
      }
      /////point用于保存当前神经元簇的位置
      var point = 0;
      // console.log("sum为："+sum)
      for (var i = 0; i < data.length; i++) {
        //console.log("第"+i+"条线")
        point += this.county[i + 1];
        // console.log(this.county[0]-sum+this.county[flag+1]/2,this.county[0]-sum+this.county[flag+1]/2, this.county[0]-point+this.county[i+1]/2, this.county[0]-point+this.county[i+1]/2)
        var color;
        if (data[i] > 0)
          color = '#c91b27'
        else
          color = '#359fdb'
        series.push({
          smooth: true,
          type: 'parallel',
          lineStyle: {
            width: (Math.abs(data[i] * 20)),
            color: color,
          },
          data: [
            // [data.length-flag, data.length-flag, data.length-i-0.5, data.length-i-0.5]
            [this.county[0] - sum + this.county[flag + 1], this.county[0] - sum + this.county[flag + 1], this.county[0] - point + this.county[i + 1], this.county[0] - point + this.county[i + 1]]
          ]
        })
      }
      option = {
        animation: false,
        parallelAxis: [
          { dim: 0, name: '0', max: max, min: 0 },
          { dim: 1, name: '1', max: max, min: 0 },
          { dim: 2, name: '2', max: max, min: 0 },
          { dim: 3, name: '3', max: max, min: 0 },
        ],
        parallel: {
          width: '100%',
          height: '100%',
          left: '2%',
          top: '5%',
          parallelAxisDefault: {
            show: false
          }
        },
        series: series
      };
      //   myChart.on('click', function (param) {
      //   console.log("我被点击了")
      // })
      option && myChart.setOption(option);
    }
  }
})
</script>

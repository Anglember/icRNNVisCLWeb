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
                radar: {
                    // shape: 'circle',
                    indicator: [
                        { name: '数据1', max: 6500 },
                        { name: '数据2', max: 16000 },
                        { name: '数据3', max: 30000 },
                        { name: '数据4', max: 38000 },
                        { name: '数据5', max: 52000 },
                        { name: '数据6', max: 25000 }
                    ]
                },
                series: [
                    {
                        name: 'Budget vs spending',
                        type: 'radar',
                        data: [
                            {
                                value: [4200, 3000, 20000, 35000, 50000, 18000],
                                name: 'Allocated Budget',
                                itemStyle:{
                                  color:'LightSkyBlue'
                                }
                            },
                            {
                                value: [5000, 14000, 28000, 26000, 42000, 21000],
                                name: 'Actual Spending',
                                itemStyle:{
                                  color:'Coral'
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


<template>
    <div ref="Chart" id="Chart" :style="{ height: height }"></div>
</template>
<script>
var echarts = require('echarts');
let elementResizeDetectorMaker = require('element-resize-detector');
export default {
    name: 'Radar',
    props: {
        data: {
            type: Object
        },
        methods: {
            default: ' '
        },
        mapping: {
            type: Object
        },
        Interact: {
            type: Object
        },
        ResizeData: {
            type: Number
        },
        height: String //高度
    },
    watch: {
        // ResizeData(newval) {
        //   this.myChart.resize();
        // },
        // "data.checkList"(newval) {
        //   console.log("this.Radar.data", newval);
        //   this.changeCheckList();
        // },
        // "mapping.RMSEColor"(newval) {
        //   this.changeCheckList();
        // },
        // "mapping.SquareColor"(newval) {
        //   this.changeCheckList();
        // },
        // "mapping.PEARSONRColor"(newval) {
        //   this.changeCheckList();
        // },
        // "mapping.MAPEColor"(newval) {
        //   this.changeCheckList();
        // },
        // "mapping.MAEColor"(newval) {
        //   this.changeCheckList();
        // },
        // "Interact.checkList"(newval) {
        //   console.log("this.Radar.Interact", newval);
        //   this.HandleInteract(newval);
        // },
    },
    data() {
        return {
            dataSet: {},
            myChart: null
        };
    },
    methods: {
        HandleInteract(newval) {
            // var bool = [false];
            // for (var i = 0; i < newval.length; i++) {
            //   switch (newval[i]) {
            //     case "悬浮-细节": bool[0] = true; break;
            //   }
            // }
            var option = {
                tooltip: {
                    trigger: 'item',
                    show: newval[0]
                }
            };
            // bool = [false];
            this.myChart.setOption(option);
        },
        changeCheckList() {
            var dataLine = [];
            var bool = [];
            var my_color = ['#5470c6', 'LightSkyBlue', 'LightBLue', 'PapayaWhip', 'Coral'];
            my_color[0] = this.mapping.RMSEColor;
            my_color[1] = this.mapping.SquareColor;
            my_color[2] = this.mapping.PEARSONRColor;
            my_color[3] = this.mapping.MAPEColor;
            my_color[4] = this.mapping.MAEColor;
            console.log('mymymycolor', my_color);
            for (var i = 0; i < this.data.checkList.length; i++) {
                switch (this.data.checkList[i]) {
                    case 'RMSE':
                        bool[i] = 0;
                        break;
                    case 'Square':
                        bool[i] = 1;
                        break;
                    case 'PEARSONR':
                        bool[i] = 2;
                        break;
                    case 'MAPE':
                        bool[i] = 3;
                        break;
                    case 'MAE':
                        bool[i] = 4;
                        break;
                }
            }
            for (var i = 0; i < this.data.checkList.length; i++) {
                dataLine.push({
                    value: this.dataSet.value[bool[i]],
                    itemStyle: {
                        color: my_color[bool[i]]
                    }
                });
            }
            var option = {
                // tooltip: {
                //   trigger: "item",
                // },
                xAxis: {
                    type: 'category',
                    data: this.data.checkList,
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 45
                    }
                },
                series: {
                    type: 'bar',
                    data: dataLine
                }
            };
            //console.log("this.bool", bool, selected);
            this.myChart.setOption(option);
        },
        getData() {
            // this.$parent.$on('Msg got',(()=>{
            //     console.log("我来取数据了")
            //     this.dataSets=this.$parent.dataSets[this.dataSource];
            //     //this.dataSets=this.$parent.dataSets["Processed"];
            //     this.$emit('success')
            // }))
            try {
                this.dataSet = require('../../assets/Evaluate/Radar.json');
                console.log(this.dataSet);
            } catch (err) {
                console.log(err);
            }
            this.Radar();
        },
        // Radar()
        // {
        //     console.log("数据集:",this.dataSet)
        //     var data_colunm=[];
        //     var myChart = echarts.init(this.$refs.Chart);
        //     var option;
        //     option = {
        //     radar: {
        //         indicator: [
        //             { name: 'RMSE', max: 1},
        //             { name: 'R-Square', max: 1},
        //             { name: 'PEARSONR', max: 1},
        //             { name: 'MAPE', max: 1},
        //             { name: 'MAE', max: 1},
        //         ],
        //         center: ["52%", "62%"],
        //         radius: ["0%", "60%"],
        //     },
        //     series: [{
        //         name: '模型对比',
        //         type: 'radar',
        //         data: [this.dataSet]
        //     }]
        // };
        // option && myChart.setOption(option);
        // }

        Radar() {
            var data_colunm = [];
            for (var i = 0; i < this.dataSet.length; i++) data_colunm[i] = this.dataSet[i].name;
            this.myChart = echarts.init(this.$refs.Chart);
            var option;
            option = {
                // tooltip: {
                //   trigger: "item",
                // },
                dataGroupId: '',
                animationDurationUpdate: 500,
                xAxis: {
                    type: 'category',
                    data: ['RMSE', 'Square', 'PEARSONR', 'MAPE', 'MAE'],
                    axisLabel: {
                        show: true,
                        interval: 0,
                        rotate: 45
                    }
                },
                yAxis: {
                    show: true
                },
                series: {
                    type: 'bar',
                    id: '模型',
                    data: [
                        {
                            name: 'RMSE',
                            value: this.dataSet.value[0],
                            itemStyle: {
                                color: '#5470c6'
                            }
                        },
                        {
                            name: 'Square',
                            value: this.dataSet.value[1],
                            itemStyle: {
                                color: 'LightSkyBlue'
                            }
                        },
                        {
                            name: 'PEARSONR',
                            value: this.dataSet.value[2],
                            itemStyle: {
                                color: 'LightBLue'
                            }
                        },
                        {
                            name: 'MAPE',
                            value: this.dataSet.value[3],
                            itemStyle: {
                                color: 'PapayaWhip'
                            }
                        },
                        {
                            name: 'MAE',
                            value: this.dataSet.value[4],
                            itemStyle: {
                                color: 'Coral'
                            }
                        }
                    ]
                }
            };
            option && this.myChart.setOption(option);
            let erd = elementResizeDetectorMaker();
            let that = this;
            erd.listenTo(document.getElementById('Chart'), function(element) {
                that.$nextTick(function() {
                    this.myChart.resize();
                });
            });
        }
    },
    created() {
        setTimeout(() => {
            this.$nextTick(() => {
                this.$nextTick(() => {
                    this.getData();
                });
            });
        }, 0);
    },
    mounted() {}
};
</script>

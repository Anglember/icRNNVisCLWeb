<template>
  <div class="board container" style="width: 100%;height:84.8vh" ref="cardPanel">
    <grid-layout :layout=" layoutData" :col-num="colNum" :row-height="rowHeight" :is-draggable="false" :is-resizable="false" :is-mirrored="false" :vertical-compact="true" :margin="margin" :use-css-transforms="true">
      <grid-item v-for="(item) in layoutData" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="'comp'+item.i">
        <!-- 根据组件名动态加载组件 -->
        <!-- numPanel类型的组件 -->
        <el-card shadow="hover" v-if="item.type=='numPanel'" class="" style="width: 100%;height:100%">
          <component :is="item.Component" :numText="item.textContent" :num="$data.param[item.dataName]" :height="item.h*rowHeight+(item.h-2)*10 +'px'"></component>
        </el-card>
        <!-- 折线类型的组 -->
        <el-card shadow="hover" v-else-if="item.type=='lineChart'" class="" style="width: 100%;height:100%">
          <component :is="item.Component" :title-text="item.titleText" :x-array="$data.xArrayList[item.xArray]" :series-data="$data.yArrayList[item.seriesData]" :height="item.h*rowHeight+(item.h-2)*10 +'px'"></component>
        </el-card>
        <el-card shadow="hover" v-else class="" style="width: 100%;height:100%">
          <component :is="item.Component" :height="item.h*rowHeight+(item.h-2)*10 +'px'"></component>
        </el-card>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
//布局数据
import layoutdata from '../../../public/layout/layoutdata.json'
//组件资源数据
import VueGridLayout from 'vue-grid-layout'
const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem
import barChart from '../chart/newChart'
import lineChart from '../chart/newLineChart'
import parChart from '../chart/parChart'
import mapChart from '../chart/mapChart'
import borderChart from '../chart/borderChart'
import cdf from '../chart/cdf'
import electric from '../numPanel/electric'
import axios from 'axios'
// mqtt连接
import mqtt from "mqtt";
// WebSocket 连接字符串
const WebSocket_URL = "ws://39.106.26.202:8083/mqtt";
// TCP/TLS 连接字符串，仅限 Node.js 环境
const TCP_URL = "mqtt://39.106.26.202:1883";
const TCP_TLS_URL = "mqtts://39.106.26.202:8883";
// 连接选项
const options = {
  // 超时时间
  connectTimeout: 4000,
  // 认证信息
  clientId: "test1",
  username: "客户端1",
  password: 'test1',
  keepalive: 60,
  clean: true
};
const client = mqtt.connect(WebSocket_URL, options);

export default {
  data () {
    return { // 布局数据
      layoutData: [],
      colNum: 12,//行数
      rowHeight: 100,//行高
      isDraggable: true,
      isResizable: true,
      isMirrored: false,
      verticalCompact: true,
      margin: [10, 10],
      useCssTransforms: true,
      param: {
        equipNum: 5,
        breakEquipNum: 10,
      },
      xArrayList: {
        timeArrar: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"],

      },
      yArrayList: {
        valueArrary: [24.5, 26, 28, 24, 23, 15, 19],
      },
      //参数字典，存放参数列表，供下拉列表框选择,
      paramList: [
        { name: '正常设备', id: 'equipNum' },
        { name: '异常设备', id: 'breakEquipNum' },
      ],
      xList: [{ name: '时间数据', id: 'timeArrar' }],
      yList: [{ name: '温度', id: 'valueArrary' }],
      timer: '',

    }
  },
  mounted () {
    // 加载完成后显示提示
    var height = this.$refs.cardPanel.offsetHeight; //100
    console.log(height)
    this.rowHeight = (height - 60) / 6
    window.onresize = () => {
      var height = this.$refs.cardPanel.offsetHeight; //100
      console.log(height)
      this.rowHeight = (height - 60) / 6
    };
    this.initMqtt()
    //动态改变值
    // this.timer = setInterval(this.ChangeData, 5000);
    this.SubMessage()

  },
  components: {
    GridLayout,
    GridItem,
    barChart,
    lineChart,
    parChart,
    mapChart,
    borderChart,
    cdf,
    electric
  },
  methods: {
    init () {
      this.layoutData = layoutdata
      //   axios.get('http://39.106.26.202:8089/layoutdata')
      //     .then((response) => {
      //       console.log(response)
      //       this.layoutData = response.data
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
    },
    // 动态刷新数据
    ChangeData: function () {
      let equipNum = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
      let breakEquipNum = 15 - equipNum;
      let tem = Math.random() * (37 - 15) + 15;
      this.param.equipNum = equipNum;
      this.param.breakEquipNum = breakEquipNum;
      //   this.yArrayList.valueArrary.shift();
      this.yArrayList.valueArrary.push(tem);
    },
    //   初始化MQTT服务器
    initMqtt: function () {

      // 连接成功后初始化订阅
      client.on("connect", () => {
        console.log("Connected to", WebSocket_URL);
        // 订阅主题
        client.subscribe('gczd/201899990001/realData', err => {
          console.log(err || "订阅成功");
        });
      });
      // 为 message 时间添加处理函数

    },
    // 订阅数据
    SubMessage: function () {
      client.on("message", (topic, message) => {
        console.log("收到来自", topic, "的消息:", message.toString());
        //   消息转为json字符串
        let jsonMessage = JSON.parse(message.toString())
        // console.info(jsonMessage)
        this.yArrayList.valueArrary.push(jsonMessage.tem)
        // console.info(topic)
        // if (topic.substring(topic.length - 4) == "data") {
        //   timeData.push(message.toString());
        // } else if (topic.substring(topic.length - 4) == "_ack") {
        //   realData.push(message.toString());
        // }
        // 断开连接
        //   client.end()
      });
    }

  },
  created () {
    this.init()

  }
}
</script>
<style scoped>
.container {
    background: none;
    border: none;
    padding: 0px;
}
.el-row >>> .el-col {
    padding: 0;
}
.page_card {
    height: 100%;
}
.el-card >>> .el-card__header {
    background: #ffffff;
}
.el-card >>> .el-card__body {
    padding: 5px;
}
.el-card[data-v-6a6616b2] >>> .el-card__body {
    padding: 0px;
}
</style>

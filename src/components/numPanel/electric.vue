<template>

  <div :id="elId" class="grid-content grid-con-0" :style="{height:height}" ref="numPanel">
    <svg-icon :icon-class="iconName" class="grid-con-icon" :style="{'height':height,'line-height':height,'font-size':iconSize}" />
    <div class="grid-cont-right">
      <div class="grid-num" :style="{'font-size':numSize}">{{num}}</div>
      <div :style="{'font-size':textSize}">{{numText}}</div>
    </div>
  </div>

</template>

<script>
import uuidv1 from 'uuid/v1'
let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  data () {
    return {
      elId: '',
      classObject: {
        'height': '',
        'line-height': ''
      },
      iconSize: '',
      numSize: '',
      textSize: '',
      panelSize: '',
    }
  },
  props: {
    height: String,//高度
    iconName: {
      type: String,
      default: 'electric'
    },
    num: {
      type: Number,
      default: 0,
    },
    numText: {
      type: String,
      default: "显示内容",
    }
  },
  created () {
    this.elId = uuidv1() //获取随机id
  },

  mounted () {

    //监听元素变化
    let erd = elementResizeDetectorMaker();
    let that = this;
    erd.listenTo(document.getElementById(this.elId), function (element) {
      that.$nextTick(function () {
        var myHeight = that.$refs.numPanel.offsetHeight; //100
        that.iconSize = myHeight * 0.425 + 'px'
        that.numSize = myHeight * 0.275 + 'px'
        that.textSize = myHeight * 0.20 + 'px'
        let newHight = that.height.substring(0, that.height.length - 2)
        newHight = Number(newHight)
        that.panelSize = newHight - 10 + 'px'
        // console.info('bianhua')
        // console.info(that.panelSize)
      })
      //   window.onresize = () => {
      //     return (() => {
      //       let newHight = that.height.substring(0, that.height.length - 2)
      //       newHight = Number(newHight)
      //       that.panelSize = newHight - 10 + 'px'
      //       console.info('bianhua')
      //       console.info(that.panelSize)
      //     })()
      //   }
    })
  },
  methods: {


  },
  computed: {

  }
}
</script>

<style  scoped>
.el-card[data-v-6a6616b2] >>> .el-card__body {
    padding: 0px;
}
.grid-content {
    display: flex;
    align-items: center;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    /* font-size: 14px; */
    color: #1296db;
}

.grid-num {
    font-weight: bold;
}

.grid-con-icon {
    /* font-size: 50px; */
    width: 40%;
    /* height: 100px; */
    text-align: center;
    /* line-height: 100px; */
    color: #fff;
}
.grid-con-0 .grid-con-icon {
    background: #1296db;
}

.grid-con-0 .grid-num {
    color: #1296db;
}
</style>

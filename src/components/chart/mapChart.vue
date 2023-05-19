<template>
  <div class="bmap">
    <baidu-map ref="mapPanel" class="bm-view" :id="elId" :style="{height:height}" :center="{lng: 121.4095, lat: 31.1796}" :zoom="15" :scroll-wheel-zoom="true">
    </baidu-map>
  </div>
</template>

<script>
// import BaiduMap from 'vue-baidu-map/components/Map/Map.vue'
//引入uuid文件
import uuidv1 from 'uuid/v1'
let elementResizeDetectorMaker = require("element-resize-detector");
export default {
  name: "bmap",
  data () {
    return {
      elId: '',
      newheight: '',
    }
  },
  props: {
    height: String,//高度
  },
  computed: {

  },
  created () {
    this.elId = uuidv1() //获取随机id
  },
  mounted () {
    // 加载完成后显示提示
    // let myheight = this.height
    // myheight = myheight.substring(0, 3)

    // myheight = parseInt(myheight, 10)
    // if (myheight > 200) {
    //   myheight + 50
    //   this.newheight = myheight + 'px'
    //   console.log(this.newheight)
    // } else {
    //   this.newheight = myheight + 'px'
    // }

    // var newheight = this.$refs.mapPanel.offsetHeight; //100
    // console.log(newheight)
    // this.height = newheight + 50
    // window.onresize = () => {
    //   var newheight = this.$refs.mapPanel.offsetHeight; //100
    //   console.log(newheight)
    //   this.height = newheight + 50
    // };
  },
};
</script>

<style  scoped>
.bm-view {
    width: 100%;
}
</style>

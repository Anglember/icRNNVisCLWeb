<template>
  <div class="mainwrapper">
    <div class="textwrapper">{{panelText}}</div>
    <div class="numwrapper"><span class="panel-num ">{{panleNum}}</span><span class="panelUnit">{{panelUnit}}</span></div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    panelText: {
      type: String,
      default: "标题"
    },
    panleNum: {
      type: String,
      default: '22.06'
    },
    panelUnit: {
      type: String,
      default: '℃'
    }
  },
  components: {

  }
}
</script>

<style  scoped>
/* 导入字体 */
@font-face {
    font-family: 'DS-DIGIT';
    src: url('../../assets/font/lcd/DS-DIGIT.woff2') format('woff2'), url('../../assets/font/lcd/DS-DIGIT.ttf') format('truetype'),
        url('../../assets/font/lcd/DS-DIGIT.eot') format('embedded-opentype');
}
.mainwrapper {
    border: 1px solid #96c2f1;
    margin-bottom: 8px;
}
.textwrapper {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-family: 'DS-DIGIT';
    font-size: 18px;
    font-weight: 200;
    font-style: italic;
    color: rgb(0, 254, 254);
    background-color: none;
}
.numwrapper {
    padding-left: 20px;
    background-image: url('../../assets/img/panel2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.panel-num {
    /* background: #0e1d22; */
    font-family: 'DS-DIGIT';
    height: 50px;
    line-height: 50px;
    font-size: 40px;
    color: #00fffe;
}
.panelUnit {
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    font-weight: 500;
    color: #00fffe;
}
</style>

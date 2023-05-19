<template>
  <div style="width:100%;height:100%"><slot></slot>
  </div>
</template>
<script>
export default ({
  name: 'DataQualityAnalysis',
  data () {
    return {
      dataSets: {
        originData: {},
        activity: {},
        predictData: {}
      }
    }
  },
  watch: {
    dataSets (newval) {
      console.log("怎么回事")
      console.log(newval)
      if (newval.activity.data.length > 0)
        console.log("检测到改变了")
    }
  },
  methods: {
    async get_hidden_data () {
      await this.$http.get('http://localhost:5000/get_hidden_data').then(res => {
        if (res.data) {
          //var activity=JSON.parse(JSON.stringify(res.data));
          //this.dataSets.append(activity)
          this.dataSets.activity = JSON.parse(JSON.stringify(res.data));
          //var datag=JSON.parse(JSON.stringify(res.data));
          console.log("激活值")
          console.log(this.dataSets.activity)
          // alert("来啦！")
          //return datag
          this.$emit('setData', this.dataSets)
        }
      }).catch(err => {
        alert('激活值获取失败啦：' + err)
      })
    },
    async get_origin_data () {
      await this.$http.get('http://localhost:5000/get_origin_data').then(res => {
        if (res.data) {
          //var activity=JSON.parse(JSON.stringify(res.data));
          //this.dataSets.append(activity)
          this.dataSets.originData = JSON.parse(JSON.stringify(res.data));
          //var datag=JSON.parse(JSON.stringify(res.data));
          console.log("原始值")
          console.log(this.dataSets.originData)
          // alert("来啦！")
          //return datag
        }
      }).catch(err => {
        alert('原始值获取失败啦：' + err)
      })
    },
    async get_predict_data () {
      await this.$http.get('http://localhost:5000/get_predict_data').then(res => {
        if (res.data) {
          //var activity=JSON.parse(JSON.stringify(res.data));
          //this.dataSets.append(activity)
          this.dataSets.predictData = JSON.parse(JSON.stringify(res.data));
          //var datag=JSON.parse(JSON.stringify(res.data));
          console.log("预测值")
          console.log(this.dataSets.predictData)
          // alert("来啦！")
          //return datag
        }
      }).catch(err => {
        alert('预测值获取失败啦：' + err)
      })
    },
  },
  created () {
    //this.get_hidden_data();
    //this.get_origin_data();
    //this.get_predict_data();
  },
  mounted () {

  },
})
</script>

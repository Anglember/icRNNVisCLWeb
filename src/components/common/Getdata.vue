<template>
</template>
<script>
export default {
  name: "ModelArchitectureEvaluation",
  data () {
    return {
    };
  },
  computed: {
  },
  props: {


  },
  watch: {


  },
  methods: {

    //////////////获取激活值///////////////
    async get_model_data () {

      await this.$http
        .get("http://127.0.0.1:5000//model/mul_line_chart")
        .then((res) => {
          // console.log(res.data);
          this.$store.commit('addPredictdata', res.data.data_y)
          this.$store.commit('addOrigindata', res.data.data_x)
          this.$store.commit('addHiddendata', res.data.hidden_value[0])
          // console.log(res.data.data_y)
        })
        .catch((err) => {
          alert("激活值获取失败啦：" + err);
        });
    },
    async getclusterData () {
      await this.$http.get('http://127.0.0.1:5000//analysis/bipartite_graph').then(res => {
        if (res.data) {
          console.log("这里有数据吗")
          console.log(res.data)
          // this.dataSets.Biparted.symbolic_data = JSON.parse(JSON.stringify(res.data.data.symbolic_data));
          // this.dataSets.Biparted.symbols = JSON.parse(JSON.stringify(res.data.symbols))
          // this.dataSets.Biparted.cluster_num = JSON.parse(JSON.stringify(res.data.cluster_num))
          // this.dataSets.Biparted.units_data = JSON.parse(JSON.stringify(res.data.data.units_data));
          // this.dataSets.Biparted.link_value = JSON.parse(JSON.stringify(res.data.data.link_data))
          // this.dataSets.Biparted.detail_units_data = JSON.parse(JSON.stringify(res.data.data.detail_units_data))
          // this.dataSets.Biparted.cluster_scatter = JSON.parse(JSON.stringify(res.data.data.cluster_scatter))
          // this.dataSets.Biparted.sax_martrix = JSON.parse(JSON.stringify(res.data.data.sax_martrix))
          //this.dataSets.active=JSON.parse(JSON.stringify(res.data.data.active));
          console.log("聚类结果")
          // console.log(this.dataSets.Biparted.feature)
        }
      }).catch(err => {
        alert('聚类值获取失败啦：' + err)
        console.log("二部图数据获取失败:" + err)
      })
    },
  },
  mounted () {
    this.get_model_data();
    this.getclusterData();
    console.log("数据获取")
  },
};
</script>

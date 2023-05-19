<template>
  <div>
    <slot></slot>
  </div>

</template>
<script>
import ComponentStructure from './ComponentStructure.vue'
export default ({
  name: "ClusterRelationGragh",
  components: {
    ComponentStructure,
  },
  data () {
    return {
      dataSets: {

        //unitsflag:this.$store.state.unitsflag
        Biparted: {
          ///////////保存二部图中的图符列表
          symbolic_data: {},
          ////////////标识图符类型///////
          symbols: [],
          //////////聚类后的隐藏单元数据///////
          units_data: {},
          //////////相关性连线/////////
          link_value: {},
          detail_units_data: {},/////////////用于存储单个隐藏单元对符号化簇的激活值
          //////////聚类散点数据
          cluster_scatter: {},
          /////////符号化后图符对应激活值
          sax_martrix: {},
        },
      },
      Mymodule_name: this.module_name,
      styleObject: { width: this.width, height: this.height, border: this.border },
    }
  },
  props: {
    width: {
      default: "100%"
    },
    height: {
      default: "100%"
    },
    border: {
      default: "1px solid black"
    },
    module_name: {
      default: ""
    }
  },
  methods: {
    async getData () {
      await this.getclusterData();
      //await this.getLine();
      this.$emit('Msg got')
    },
    async getclusterData () {
      await this.$http.get('http://127.0.0.1:5000//analysis/bipartite_graph').then(res => {
        if (res.data) {
          console.log("这里有数据吗")
          console.log(res.data)
          this.dataSets.Biparted.symbolic_data = JSON.parse(JSON.stringify(res.data.data.symbolic_data));
          this.dataSets.Biparted.symbols = JSON.parse(JSON.stringify(res.data.symbols))
          this.dataSets.Biparted.cluster_num = JSON.parse(JSON.stringify(res.data.cluster_num))
          this.dataSets.Biparted.units_data = JSON.parse(JSON.stringify(res.data.data.units_data));
          this.dataSets.Biparted.link_value = JSON.parse(JSON.stringify(res.data.data.link_data))
          this.dataSets.Biparted.detail_units_data = JSON.parse(JSON.stringify(res.data.data.detail_units_data))
          this.dataSets.Biparted.cluster_scatter = JSON.parse(JSON.stringify(res.data.data.cluster_scatter))
          this.dataSets.Biparted.sax_martrix = JSON.parse(JSON.stringify(res.data.data.sax_martrix))
          //this.dataSets.active=JSON.parse(JSON.stringify(res.data.data.active));
          console.log("聚类结果")
          console.log(this.dataSets.Biparted.feature)
        }
      }).catch(err => {
        alert('聚类值获取失败啦：' + err)
        console.log("二部图数据获取失败:" + err)
      })
    },
  },
  mounted () {
    this.getData();
    this.$on('Msg got', (() => {
      console.log("我是聚类组件，已经获取到数据了");
    }))
  },
})
</script>

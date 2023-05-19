<template>
  <div style="width:100%;height:100%;">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "ModelArchitectureEvaluation",
  data() {
    return {
      node: "结构评估",
      dataSets: {
        activity: {},
        loss: [],
        weight: {},
        origin: {},
        predict: {},
      },
    };
  },
  computed: {
    ////////用于获取隐藏单元数/////////
    ModelParameter() {
      return this.$store.state.Parameters;
    },
  },
  watch: {
    ////////标识神经网络隐藏层数////////
    ModelParameter(newval) {
      console.log("获取到参数值了：" + newval);
      console.log(this.ModelParameter);
    },
  },
  methods: {
    ////////当所有数据均获取到后发送消息//////////
    async getData() {
      console.time("折线图渲染时间");

      await this.get_model_data();
      this.$emit("Msg got");
      //  console.timeEnd('折线图获取数据时间')
    },
    //////////////获取激活值///////////////
    async get_model_data() {
      //await   this.$http.get('http://10.120.195.170//model/mul_line_chart').then(res => {
      // await this.$http.get('http://10.120.18.77//model/mul_line_chart').then(res => {

      await this.$http
        .get("http://127.0.0.1:5000//model/mul_line_chart")
        .then((res) => {
          // await   this.$http.get('http://localhost:5000/getSummarydata').then(res => {
          //this.Boxplot(res.data)
          if (res.data) {
            console.log("能获取到数据吗");
            console.log(res.data);
            this.dataSets.origin = JSON.parse(JSON.stringify(res.data.data_x));
            this.dataSets.predict = JSON.parse(JSON.stringify(res.data.data_y));
            this.dataSets.activity = JSON.parse(
              JSON.stringify(res.data.hidden_value)
            );
            for (var i = 0; i < this.dataSets.predict[0].length; i++) {
              // this.dataSets.loss[i]=Math.abs(this.dataSets.predict[1][i]-this.dataSets.predict[0][i])
              this.dataSets.loss[i] =
                this.dataSets.predict[1][i] - this.dataSets.predict[0][i];
            }
          }
        })
        .catch((err) => {
          alert("激活值获取失败啦：" + err);
        });
    },
  },
  mounted() {
    //this.$root.$on('Show',(()=>{
    this.getData();
    this.$on("Msg got", () => {
      console.log("我是模型结构评估组件，已经获取到数据了");
      console.log(this.dataSets.activity);
    });
    //}))
  },
};
</script>

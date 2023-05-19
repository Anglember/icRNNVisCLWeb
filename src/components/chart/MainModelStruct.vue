<template>
  <div :style="{height:height}" style="display:flex;flex-direction:row">
    <div style="width:50%;height:90%;">
      <ModelStructure></ModelStructure>
    </div>
    <div style="margin-top:5%;width:50%;height:90%">
      <DetailRNN></DetailRNN>
    </div>

  </div>
</template>
<script>

import ModelStructure from './ModelStructure'
import DetailRNN from './DetailRNN';
export default({
  name:"MainBipart",
  components: {
    ModelStructure,
    DetailRNN,
  },
  data(){
  return{
  }
},
props:{
  height:String
  },
methods:{
  
},
mounted(){
},
})
</script>

<template>
  <div v-bind:style="styleObject">
      <div style="position:absolute;width:99.9%;top:0px;letf:0px;height:30px;background:#9f9ca5;font-size:15px;">
          <div style="padding-left:2%;padding-top:1%">{{module_name}}</div>
          <!-- <button style="position:absolute;right:1%;top:1%;z-index:9999;" @click="Update()">更新</button> -->
      </div>
      <div v-bind:style="styleObject2">
          <div style="position:absolute;width:100%;height:99%;">
              <slot></slot>
          </div>
      </div>
  </div>
</template>
<script>
export default ({
  name:"CompontStructure",
  data(){
      return {
          styleObject:this.myStyle,
          styleObject2:{position:this.position,top:this.top,width:this.width,height:this.height,background:this.background},
          module_name:this.myTitle,
          xxxx:"hhhhhhhhh",
          dataSets:{},
          key:true
      }
  },
  methods:{
  },
  created(){
  },
  mounted(){
  },
  props:{
      myStyle:{
          default:"width:100%;height:100%;border:1px solid black"
      },
      myTitle:{
          default:""
      },
      position:{
          default:"absolute"
      },
      top:{
          default:"8.5%"
      },
      width:{
              default:"99.9%"
          },
      height:{
          default:"90.5%"
      },
      background:{
          default:"white"
      },
  }
})
</script>
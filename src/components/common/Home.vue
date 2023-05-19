<template>
  <div style="
    width: 100%;
    height: 100%;
    overflow: hidden;">
    <!-- <v-head></v-head> -->
    <GetdataVue></GetdataVue>
    <div class="box_content">
      <DragListVue :collapse="collapse" :collapse_Setting="collapse_Setting"></DragListVue>
    </div>
  </div>
</template>

<script>
import GetdataVue from './Getdata.vue';
import DragListVue from '../page/DragList.vue';
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
  data () {
    return {
      tagsList: [],
      collapse: false,
      collapse_Setting: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags,
    DragListVue,
    GetdataVue
  },
  created () {
    this.$nextTick(() => {
      bus.$on('collapse', msg => {
        this.collapse = msg;
      });
      bus.$on('collapse_Setting', msg => {
        this.collapse_Setting = msg;
      });
    })

  }
};
</script>
<style scoped>
.box_content {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>

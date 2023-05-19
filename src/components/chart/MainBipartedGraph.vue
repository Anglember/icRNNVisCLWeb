<template>
  <div style="height:200px;width:300px">
    <ClusterRelationGragh>
      <BipartedGraph></BipartedGraph>
    </ClusterRelationGragh>
  </div>
</template>
<script>

import DataQualityAnalysis from 'D:/Learn VUE/VueDragPro-master/src/components/chart/DataQualityAnalysis.vue'
import ClusterRelationGragh from 'D:/Learn VUE/VueDragPro-master/src/components/chart/ClusterRelationGragh.vue';
import BipartedGraph from 'D:/Learn VUE/VueDragPro-master/src/components/chart/BipartedGraph';
export default ({
  name: "MainBipart",
  components: {
    DataQualityAnalysis,
    ClusterRelationGragh,
    BipartedGraph
  },
  data () {
    return {
    }
  },
  props: {

  },
  methods: {

  },
  mounted () {
  },
})
</script>

<template>
  <ModelArchitectureEvaluation>
    <ModelStructureDisplay>
      <SequenceGraph></SequenceGraph>
    </ModelStructureDisplay>
  </ModelArchitectureEvaluation>
</template>
<script>
import ModelStructureDisplay from './ModelStructureDisplay.vue'
import SequenceGraph from './SequenceGraph'
import ModelArchitectureEvaluation from './ModelArchitectureEvaluation'
export default {
  name: "",
  components: {
    ModelStructureDisplay,
    SequenceGraph,
    ModelArchitectureEvaluation
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  },
  props: {
  }
}
</script>
<style scoped>

</style>

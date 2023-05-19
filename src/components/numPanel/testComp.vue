<template>
  <div>
    {{code}}
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    code: {
      type: String,
      default: "默认值"

    }

  },
  components: {

  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped></style>

<template>
  <div class="borderTitle">
    <span>{{ title }}</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
.borderTitle {
  position: relative;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 20px;
  margin: 10px;

  >span {
    position: absolute;
    left: 20px;
    top: -11px;
    width: 80px;
    text-align: center;
    font-size: 16px;
    color: #606266;
    font-weight: 900;
    background: #fff;
  }
}
</style>
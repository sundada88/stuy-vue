<template>
  <component
    :is="tag"
    :class="['col',{[`col-${span}`]: span}]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    span: String || Number,
    offset: String || Number
  }
}
</script>

<style lang="less" scoped>
.col {
  float: left;
}
.generate-col(24);
.generate-col(@n, @i: 1) when (@i < @n) {
  .col-@{i} {
    width: @i / @n * 100%;
  }
  .generate-col(@n, @i + 1);
}
</style>

<template>
  <div class="list-item" ref="list-item">
    <slot :item="item">
      <div>{{item.value}}</div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'list-item',
  props: {
    item: Object,
    index: Number
  },
  mounted () {
    this.$emit('handleMounted', { index: this.index, height: this.$refs['list-item'].getBoundingClientRect().height })
  }
}
</script>

<style scoped>

</style>

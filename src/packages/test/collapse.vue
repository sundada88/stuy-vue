<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'collapse',
  props: {
    value: [Array, String, Number]
  },
  data () {
    return {
      items: []
    }
  },
  methods: {
    handleInput (currentName, show) {
      console.log(currentName, show)
      const items = show
        ? this.value.filter(item => item !== currentName)
        : this.value.concat(currentName)
      console.log(items)
      this.$emit('input', items)
    }
  }
}
</script>

<style lang="less" scoped>
.collapse {
}
</style>

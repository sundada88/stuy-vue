<template>
  <div class="collapse--item">
    <div @click="handleClick">title: {{ title }}</div>
    <slot v-if="expended"></slot>
  </div>
</template>

<script>
export default {
  name: 'collpase-item',
  props: {
    title: String,
    name: [String, Number]
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    handleClick () {
      this.$parent.handleInput(this.currentName, this.expended)
    }
  },
  watch: {
    // expended (newValue) {
    //   this.show = newValue
    // }
  },
  computed: {
    items () {
      return this.$parent.items
    },
    index () {
      return this.items.indexOf(this)
    },
    currentName () {
      return typeof this.name !== 'undefined' ? this.name : this.index
    },
    expended () {
      if (!this.$parent) return null
      const { value } = this.$parent
      console.log('this.currentName', this.currentName)
      return value.some(name => name === this.currentName)
    }
  },
  created () {
    this.$parent.items.push(this)
    // this.show = this.expended
  }
}
</script>

<style lang="less" scoped>
.collapse--item {
}
</style>

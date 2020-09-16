<template>
  <div class="collapse-item">
    <div
      class="collapse-item_header"
      @click="handleClick"
    >
      <div>
        {{title}}
      </div>
    </div>
    <div
      class="collapse-item_content"
      v-show="show"
    >
      <slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    name: String || Number
  },
  data () {
    return {
      // show: false
    }
  },
  computed: {
    show () {
      console.log(this.$parent.value)
      return this.$parent.value.includes(this.name)
    }
  },
  methods: {
    handleClick () {
      // this.show = !this.show
      // this.$parent.$emit('changeInput', this.show, this.name)
      this.$parent.changeInput({ show: this.show, name: this.name })
      // console.log(this.$parent.changeInput)
    }
  }

}
</script>

<style lang="less" scoped>
</style>

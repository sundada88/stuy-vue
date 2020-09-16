<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
// <collapse v-model="test">
//       <collapse-item
//         title="这是一个测试"
//         name="1"
//       >
//         hahahahhahah
//       </collapse-item>
//       <collapse-item
//         title="这是一个测试"
//         name="2"
//       >
//         hahahahhahah2
//       </collapse-item>
//       <collapse-item
//         title="这是一个测试"
//         name="3"
//       >
//         hahahahhahah3
//       </collapse-item>
//     </collapse>
export default {
  props: {
    value: {
      tyep: Array,
      default: () => {
        return []
      }
    },
    accordion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeInput ({ show, name }) {
      const value = this.value
      if (this.accordion) {
        value.pop()
        !show && value.push(name)
      } else {
        if (show) {
          const index = value.indexOf(name)
          value.splice(index, 1)
        } else {
          value.push(name)
        }
      }
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

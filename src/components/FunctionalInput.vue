
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  render (h) {
    const self = this
    return h('input', {
      domProps: {
        value: self.value
      },
      on: {
        input (e) {
          self.$emit('input', e.target.value)
        }
      }
    })
  }
}
</script>

<style  scoped>
</style>

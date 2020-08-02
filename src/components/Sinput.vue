<template>
  <div>
    <input :type="type"
           v-bind="$attrs"
           :value="value"
           @input="handleInput" />
  </div>
</template>

<script>
import { mixin } from '../utils/mixins'
export default {
  inheritAttrs: false,
  mixins: [mixin],
  name: 'input',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('input', e.target.value)
      // this.$parent.$emit('validate', e.target.value)
      this.dispatch('formitem', 'validate', e.target.value)
    }
  }
}
</script>

<style scoped></style>

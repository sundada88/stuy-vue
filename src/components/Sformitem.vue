<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot />
    <p v-if="error"
       class="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
import { mixin } from '../utils/mixins'
export default {
  name: 'formitem',
  mixins: [mixin],
  props: ['label', 'prop'],
  inject: ['form'],
  data () {
    return {
      error: ''
    }
  },
  methods: {
    validate () {
      // console.log('formitem中')
      const value = this.form.model[this.prop]
      // console.log(value)
      // console.log({ [this.prop]: this.form.rules[this.prop] })
      const validator = new Schema({ [this.prop]: this.form.rules[this.prop] })
      return validator.validate({ [this.prop]: value }, errors => {
        if (errors) {
          // console.log(errors)
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    }
  },
  mounted () {
    // console.log(this.$parent)
    // console.log(this.$parent.$el)
    this.$on('validate', data => {
      // console.log(111111111111111111)
      this.validate(data)
    })
    if (this.prop) {
      // this.$parent.$emit('mounted', this)
      this.dispatch('form', 'mounted', this)
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

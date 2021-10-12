<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  name: 'FormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    validate () {
      return new Promise(resolve => {
        const value = this.form.model[this.prop]
        const validator = new Schema({
          [this.prop]: this.form.rules[this.prop]
        })
        validator.validate({ [this.prop]: value }, errors => {
          if (errors) {
            console.log(errors)
            this.error = errors[0].message
            resolve(false)
          } else {
            this.error = ''
            resolve(true)
          }
        })
      })
    },
    broadcast (componentName, eventName, ...params) {
      function broadcast (componentName, eventName, ...params) {
        this.$children.forEach(child => {
          if (child && child.$options && child.$options.name) {
            child.$emit(componentName, eventName, params)
          } else {
            broadcast.call(child, componentName, eventName, ...params)
          }
        })
      }
      broadcast.apply(this, componentName, eventName, params)
    },
    diapatch (componentName, eventName, ...params) {
      let parent = this.$parent || this.$root
      let name = parent.$options && parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options && parent.$options.name
        }
      }
      if (parent) this.$emit.apply(parent, eventName, params)
    }
  },
  created () {},
  mounted () {
    this.$on('validate', this.validate)
    this.$parent.$emit('mounted', this)
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>

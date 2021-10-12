<template>
  <div>
    <input :value="value" @input="handleInput" :type="type" />
  </div>
</template>

<script>
export default {
  name: 'input',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    broadcast (componentName, eventName, ...params) {
      function broadcast (componentName, eventName, ...parmas) {
        this.$children.forEach(child => {
          if (child.$options && child.$options.name === componentName) {
            child.$emit(componentName, eventName, ...params)
          } else {
            broadcast.call(child, componentName, eventName, ...params)
          }
        })
      }
      broadcast.call(this, componentName, eventName, ...params)
    },
    dispatch (componentName, eventName, ...params) {
      let parent = this.$parent || this.$root
      let name = parent.$options && parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options && parent.$options.name
        }
      }
      if (parent) {
        this.$emit.call(parent, eventName, params)
      }
    },
    // test (componentName, eventName, ...params) {
    //   let parent = this.$parent || this.$root
    //   let name = parent.$options && parent.$options.name
    //   while(parent && (!name || name !== componentName)) {
    //     parent = parent.$parent
    //     if (parent) {
    //       name = parent.$options && parent.$options.name
    //     }
    //   }
    //   if (parent) {
    //     this.$emit.apply(parent)
    //   }
    // },
    handleInput (e) {
      this.$emit('input', e.target.value)
      // this.$parent.$emit('validate')
      this.dispatch('FormItem', 'validate')
    }
  }
}
</script>

<style scoped></style>

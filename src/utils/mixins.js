function broadcast (componentName, eventName, params) {
  this.$children.forEach(child => {
    if (child.$options.name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.call(child, componentName, eventName, params)
    }
  })
}
export const mixin = {
  methods: {
    dispatch (componentName, eventName, params) {
      var parent = this.$parent || this.$root
      var name = parent.$options.name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent
        if (parent) {
          name = parent.$options.name
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },
    broadcast (componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}


<template>
  <div>
    <slot />
  </div>
</template>

<script>
// /* eslint-disable */
export default {
  name: 'form',
  provide () {
    return {
      form: this
    }
  },
  props: {
    rules: Object,
    model: {
      type: Object,
      require: true
    }
  },
  methods: {
    validate (cb) {
      const callback = this.instances.map(child => child.validate())
      // const callback = this.$children.filter(item => item.prop).map(child => child.validate())
      // console.log(callback)
      Promise.all(callback)
        .then(() => {
          const data = true
          cb(data)
        })
        .catch(() => {
          const data = false
          cb(data)
        })
    }
  },
  created () {
    this.instances = []
    this.$on('mounted', instance => {
      this.instances.push(instance)
    })
  }
}
</script>

<style  scoped>
</style>

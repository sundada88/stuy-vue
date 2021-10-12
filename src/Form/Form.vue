<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'form',
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  provide () {
    return {
      form: this
    }
  },
  methods: {
    validate (cb) {
      const results = this.instances.map(async instance => await instance.validate())
      Promise.all(results).then(res => {
        console.log(res)
        cb(res.every(item => item))
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

<style scoped>
</style>

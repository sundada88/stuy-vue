<template>
  <div>
    <h1>test1</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  // provide: {
  //   sundada: this
  // },
  provide () {
    return {
      sundada: this
    }
  },
  methods: {
    indexTest () {
      console.log(1111111)
    }
  }
}
</script>

<style lang="les" scoped></style>

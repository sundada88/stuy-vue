<template>
  <div>
    <h2 @click="handleClick">aaaaaaaaa</h2>
  </div>
</template>

<script>
export default {
  inject: ['sundada'],
  methods: {
    handleClick () {
      this.sundada.indexTest()
      // console.log(this.sundada)
    }
  }
}
</script>

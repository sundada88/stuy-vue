<template>
  <div>
    <Child v-bind="$attrs"
           v-on="$listeners"></Child>
  </div>
</template>

<script>
import Child from './Child.vue'
export default {
  name: 'parent',
  components: {
    Child
  }
}
</script>

<style>
</style>

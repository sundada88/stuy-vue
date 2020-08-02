
<template>
  <div>
    <Two :show.sync="show"></Two>
  </div>
</template>

<script>
import Two from './Two'
export default {

  data () {
    return {
      show: true
    }
  },
  components: {
    Two
  },
  methods: {
    // handle (data) {
    //   console.log(data)
    // }
  }
}
</script>

<style scoped>
</style>

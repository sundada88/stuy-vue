<template>
  <div style="padding: 20px 0;">
    <slider v-model="value"></slider>
  </div>
</template>

<script>

import slider from './slider'
export default {
  data () {
    return {
      checked: 1,
      value: 20,
      result: [
        'a', 'b'
      ],
      list: ['a', 'b', 'c']
    }
  },
  components: {
    slider
  },
  mounted () {
    // setInterval(() => {
    //   if (this.checked < 100) {
    //     this.checked++
    //   } else {
    //     this.checked = 0
    //   }
    // }, 100)
  }
}
</script>

<style scoped>
.slot1 {
  width: 50px;
  background: pink;
  border-radius: 5px;
}
</style>

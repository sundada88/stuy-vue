<template>
  <div>
    <!-- <popup v-model="show">
      <div class="content">
        孙大大大好棒啊你真的牛鬼啊啊解
      </div>
    </popup> -->
    <slider v-model="sliderValue"></slider>
  </div>
</template>

<script>
// import popup from './popup'
import slider from './slider'
export default {
  data () {
    return {
      show: true,
      sliderValue: 20
    }
  },
  components: {
    // popup
    slider
  }
}
</script>

<style scoped>
.slot1 {
  width: 50px;
  background: pink;
  border-radius: 5px;
}
.content {
  width: 100px;
  background: red;
}
</style>

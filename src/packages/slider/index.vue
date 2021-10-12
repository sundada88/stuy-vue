<template>
  <div class="slider" ref="slider">
    <span class="slider_line" ref="line" :style="lineStyle">
      <span
        class="slider_btn"
        ref="btn"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
      >
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'slider',
  data () {
    return {
      sliderWidth: 0,
      btnWidth: 0
    }
  },
  props: { value: Number || String },
  computed: {
    lineStyle () {
      return {
        width: `${((this.sliderWidth - this.btnWidth) * this.value) / 100 +
          this.btnWidth}px`
      }
    }
  },
  methods: {
    handleTouchStart (event) {
      this.restTouchStatus()
      this.startValue = this.value
      console.log(event)
      const touch = event.touches[0]
      this.startX = touch.clientX
      this.startY = touch.clientY
    },
    handleTouchMove (e) {
      const touch = e.touches[0]
      this.deltaX = touch.clientX - this.startX
      const rect = this.$el.getBoundingClientRect()
      const value = this.startValue + (this.deltaX / rect.width) * 100
      this.$emit('input', value)
    },
    restTouchStatus () {
      this.deltaX = 0
      this.deltaY = 0
    }
  },
  mounted () {
    this.sliderWidth = this.$refs.slider.offsetWidth
    this.btnWidth = this.$refs.btn.offsetWidth
  }
}
</script>

<style lang="less" scoped>
.slider {
  height: 2px;
  background: red;
  // position: relative;
  font-size: 0;
  &_line {
    // position: absolute;
    // top: 0;
    // left: 0;z
    position: relative;
    display: inline-block;
    background: green;
    height: inherit;
  }
  &_btn {
    position: absolute;
    top: 0;
    right: 0%;
    transform: translate(0, -50%);
    width: 20px;
    height: 20px;
    background: blue;
    border-radius: 50%;
  }
}
</style>

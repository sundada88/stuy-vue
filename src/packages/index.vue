<template>
  <div class="progress" ref="progress">
    <div class="progress__line" :style="lineStyle">
      <div class="progress__btn" ref="btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress',
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      progressOff: 0,
      btnOff: 0
    }
  },
  computed: {
    lineStyle () {
      return {
        width:
          ((this.progressOff - this.btnOff) * Number(this.percentage)) / 100 +
          this.btnOff +
          'px'
      }
    }
  },
  mounted () {
    this.progressOff = this.$refs.progress.offsetWidth
    this.btnOff = this.$refs.btn.offsetWidth
  }
}
</script>

<style lang="less" scoped>
.progress {
  height: 2px;
  background: red;
  position: relative;
  &__line {
    background: green;
    height: 2px;
    position: relative;
  }
  &__btn {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 30px;
    height: 10px;
    border-radius: 50%;
    background: blue;
  }
}
</style>

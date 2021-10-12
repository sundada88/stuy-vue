<template>
  <div class="progress">
    <span class="progress-pivot" :style="pivotStyle">
      <span
        v-if="!$slots.default"
        class="progress-content progress-content-position"
        >{{ content }}</span
      >
      <span v-if="$slots.default" class="progress-content-position">
        <slot></slot>
      </span>
    </span>
  </div>
</template>

<script>
// <sprogress :percentage="checked">
//       <div class="slot1">123</div>
//     </sprogress>
export default {
  props: {
    percentage: Number || String,
    inactive: Boolean,
    pivotText: String
  },
  data () {
    return {
      width: 0
    }
  },
  computed: {
    content () {
      return this.pivotText ? this.pivotText : this.percentage
    },
    pivotStyle () {
      return {
        width: `${((this.width - 50) * this.percentage) / 100 + 50}px`
      }
    }
  },
  mounted () {
    this.width = this.$el.offsetWidth
  }
}
</script>

<style lang="less" scoped>
.progress {
  height: 5px;
  background-color: red;
  position: relative;
  &-pivot {
    position: absolute;
    background-color: green;
    height: 100%;
    left: 0;
  }
  &-content {
    display: inline-block;
    width: 50px;
    // height: 20px;
    padding: 5px 0;
    background-color: blue;
    color: red;
    text-align: center;

    &-position {
      top: 50%;
      right: 0;
      position: absolute;
      transform: translate(0, -50%);
    }
  }
}
</style>

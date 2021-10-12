<template>
  <div class="switch" @click="handleClick">
    <div
      :class="['switch__btn', `switch__btn--${value ? 'right' : 'left'}`]"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  methods: {
    handleClick () {
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.switch {
  height: 30px;
  width: 50px;
  border-radius: 15px;
  background: green;
  position: relative;
  &__btn {
    height: 20px;
    width: 20px;
    background: red;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s;
  }
  &__btn--left {
    left: 10%;
  }
  &__btn--right {
    // right: 10%;
    left: calc(90% - 20px);
  }
}
</style>

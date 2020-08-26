
<template>
  <div
    class="switch"
    @click="handleClick"
  >
    <!-- <input
      type="checkout"
      class="switch-input"
    > -->
    <span :class="['switch-core', {active: value}]">

    </span>
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
      this.$emit('change', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.switch {
  position: relative;
  display: inline;
  // font-size: 0;
  &-input {
    position: absolute;
    width: 0;
    height: 0;
    outline: none;
    padding: 0;
    border: 0;
  }
  &-core {
    display: inline-block;
    height: 20px;
    width: 50px;
    border-radius: 10px;
    background: red;
    &:after {
      content: "";
      display: inline-block;
      width: 17px;
      height: 17px;
      background: black;
      border-radius: 50%;
      position: absolute;
      left: 2px;
      top: -1.5px;
      transition: all 0.3s;
    }
  }
  .active.switch-core {
    &:after {
      left: calc(100% - 20px);
    }
  }
}
</style>

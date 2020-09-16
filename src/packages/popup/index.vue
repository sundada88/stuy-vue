<template>
  <div
    :class="['sun-popup']"
    v-show="value"
  >
    <span
      v-if="$slots.default"
      class="sun-content"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'popup',
  props: {
    value: Boolean
  }
}
</script>

<style lang="less" scoped>
.sun {
  &-popup {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
    &:after {
      content: "";
      display: inline-block;
      height: 100%;
      text-align: center;
      vertical-align: middle;
    }
  }
  &-content {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
  }
}
</style>

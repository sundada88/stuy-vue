
<template>
  <div class="loading">
    <span>
      <i
        v-for="item in (type ==='spinner' ? 12 : 0)"
        :class="`spinner-${item}`"
        :key="item"
      >
      </i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'spinner'
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  width: 30px;
  height: 30px;
  background-color: #333;
  border-radius: 5px;
  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
    animation: sun-raotate 0.8s linear infinite;
    animation-timing-function: steps(12);
    i {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @keyframes sun-raotate {
        from {
          transform: rotate(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
      &::before {
        content: "";
        display: block;
        width: 3px;
        height: 25%;
        background-color: red;
        margin: 0 auto;
      }
    }
  }
}
.spinner-gen(@n, @i: 1) when (@i <=@n) {
  .spinner-@{i} {
    opacity: 1- (0.75 / 12) * (@i - 1);
    transform: rotate(@i * 30deg);
  }
  .spinner-gen(@n, @i + 1);
}
.spinner-gen(12);
</style>

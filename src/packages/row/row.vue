<template>
  <component
    :is="tag"
    :class="[
      'row',
      {
        'row-flex': flex,
        [`row-align-${align}`]: align && flex,
        [`row-justify-${justify}`]: flex && justify
      }
    ]"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'row',
  props: {
    align: String,
    tag: {
      type: String,
      default: 'div'
    },
    gutter: {
      type: String || Number
    },
    type: {
      type: String
    },
    justify: {
      type: String
    }
  },
  computed: {
    flex () {
      return this.type === 'flex'
    }
  }
}
</script>

<style lang="less" scoped>
.row {
  &:after {
    content: "";
    clear: both;
  }
  &-flex {
    display: flex;
  }
  &-justify-center {
    align-items: center;
  }
  &-justify-space-between {
    justify-content: space-around;
  }
  &-justify-space-around {
    justify-content: space-around;
  }
  &-justify-bottom {
    align-items: bottom;
  }
}
</style>

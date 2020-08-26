<template>
  <div class="checked">
    <div
      :class="['checked_icon', {'active': checked}]"
      @click="handleClick"
      :style="iconStyle"
    >

    </div>
    <span
      v-if="$slots.default"
      @click="handleClick"
    >
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
    checkedColor: String,
    name: String
  },
  methods: {
    handleClick () {
      this.checked = !this.checked
    },
    changeValue (checked) {
      console.log(checked)
      console.log(this.$parent.value)
      const arr = this.$parent.value
      if (checked) {
        arr.push(this.name)
      } else {
        const index = arr.indexOf(this.name)
        arr.splice(index, 1)
      }
      this.$emit('input', arr)
    }
  },
  computed: {
    checked: {
      get () {
        return this.$parent ? this.$parent.value.indexOf(this.name) !== -1 : this.value
      },
      set (value) {
        if (this.$parent) {
          this.changeValue(value)
        } else {
          this.$emit('input', value)
        }
      }
    },
    iconStyle () {
      const { checkedColor } = this
      return checkedColor && this.value ? { backgroundColor: checkedColor } : {}
    }
  }
}
</script>

<style lang="less" scoped>
.checked {
  display: flex;
  align-items: center;
  &_icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
  }
  .active {
    background-color: red;
  }
}
</style>

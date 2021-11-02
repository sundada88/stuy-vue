<template>
  <svg :class="svgClass" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.iconClass === 'pz') {
        return 'pz-icon ' + this.className
      } else {
        if (this.className) {
          return 'svg-icon ' + this.className
        } else {
          return 'svg-icon'
        }
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 50px;
  height: 50px;
  overflow: hidden;
}
.pz-icon {
  /* width: 100px; */
  /* height: 100px; */
}
</style>


<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    loading: {
      immediate: true,
      handler () {
        console.log('watch loading handler')
      }
    }
  },
  methods: {
    check () {
      if (this.loading || this.finished) {
        return
      }
      const wrapper = this.$refs.wrapper
      const wrapperRect = wrapper.getBoundingClientRect()
      const placeHolder = this.$refs.placeHoder
      const placeHolderRect = placeHolder.getBoundingClientRect()
      console.log(wrapperRect.bottom - placeHolderRect.bottom)
      const isReach = wrapperRect.bottom - placeHolderRect.bottom >= -10
      if (isReach) {
        this.$emit('load')
        this.$emit('update:loading', true)
      }
    }
  },
  mounted () {
    this.check()
    this.$refs.wrapper.addEventListener('scroll', () => {
      this.check()
    })
  },
  render (h) {
    console.log('this.$slots.default', this.$slots.default)
    const content = this.$slots.default
    const renderLoading = () => {
      if (this.loading) {
        return <div style="text-align: center;">loading</div>
      }
    }
    const renderFinish = () => {
      if (this.finished) {
        return <div style="text-align: center;">finished</div>
      }
    }
    const placeHolder = <div ref="placeHoder"></div>
    return (<div ref="wrapper" class="list">
      {content}
      {renderLoading()}
      {renderFinish()}
      {placeHolder}
    </div>)
  }
}
</script>

<style lang="less" scoped>
.list {
  height: 100%;
  overflow-y: scroll;
  background-color: pink;
}
</style>

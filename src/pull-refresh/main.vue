<script>

const TEXT_STATUS = ['pulling', 'loosing', 'success']
const MIN_DISTANCE = 10

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    pullingText: String,
    lossingText: String,
    loadingText: {
      type: String,
      default: 'loading'
    },
    pullDistance: [String, Number],
    successDuration: {
      type: [Number, String],
      default: 500
    },
    animationDuration: {
      type: [Number, String],
      default: 300
    },
    headHeight: {
      type: [String, Number],
      default: 50
    }
  },
  data () {
    return {
      status: 'normal',
      distance: 0,
      duration: 0,
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: ''
    }
  },
  methods: {
    reset () {
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
      this.direction = ''
    }
  },
  mounted () {
    // this.status = 'loading'
  },
  watch: {
    value: {
      handler (newVal) {
        console.log('value', newVal)
      }
    }
  },
  render (h) {
    const getStatusText = () => {
      const { status } = this
      if (status === 'normal') {
        return ''
      }
      return this[`${status}Text`]
    }

    const renderStatus = () => {
      const { status, distance } = this
      const slots = this.$slots

      if (slots[status]) {
        return slots[status]({ distance })
      }

      const nodes = []

      if (TEXT_STATUS.includes(status)) {
        nodes.push(<div class='test'>{getStatusText()}</div>)
      }
      if (status === 'loading') {
        nodes.push(<div class='loading'>{getStatusText()}</div>)
      }
      return nodes
    }
    const getHeadStyle = () => {
      if (this.headHeight !== 50) {
        return {
          height: `${this.headHeight}px`
        }
      }
    }
    const trackStyle = {
      transitionDuration: `${this.duration}ms`,
      transform: this.distance
        ? `translate3d(0,${this.distance}px, 0)`
        : ''
    }
    const ease = (distance) => {
      const pullDistance = +(this.pullDistance || this.headHeight)
      if (distance > pullDistance) {
        if (distance < pullDistance * 2) {
          distance = pullDistance + (distance - pullDistance) / 2
        } else {
          distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
        }
      }
      return Math.round(distance)
    }
    const onTouchStart = (e) => {
      this.reset()
      this.duration = 0
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
      this.status = 'loading'
    }
    const getDirection = (x, y) => {
      if (x > y && x > MIN_DISTANCE) {
        return 'horizontal'
      }
      if (y > x && y > MIN_DISTANCE) {
        return 'vertical'
      }
      return ''
    }
    const onTouchMove = (e) => {
      const touch = e.touches[0]
      this.deltaX = touch.clientX < 0 ? 0 : touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = getDirection(this.offsetX, this.offsetY)
      this.deltaY = ease(this.deltaY)
      this.distance = this.deltaY
    }
    const onTouchEnd = (e) => {
      this.duration = this.animationDuration
      console.log('this.status', this.status)
      if (this.status === 'loosing') {
        this.status = 'loading'
        this.$emit('input', true)
      } else {
        this.distance = 0
      }
    }
    return <div class="pullRefresh">
      <div class="pullRefresh-track" onTouchstart={onTouchStart} onTouchmove={onTouchMove} onTouchend={onTouchEnd} style={trackStyle}>
        <div class="pullRefresh-head" style={getHeadStyle()}>
          {renderStatus()}
        </div>
        {this.$slots.default}
      </div>
    </div>
  }
}
</script>

<style lang="less" scoped>
.pullRefresh {
  height: 100%;
  background-color: plum;
  overflow: hidden;
  &-track {
    position: relative;
    height: 100%;
    transition-property: transform;
  }
  &-head {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    color: greenyellow;
    text-align: center;
    transform: translateY(-100%);
  }
}
</style>

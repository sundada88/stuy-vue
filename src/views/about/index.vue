<template>
  <canvas id="gesture" ref="canvas" :style="style" />
</template>

<script>
/* eslint-disable */
export default {
  name: 'GestureLock',
  props: {
    chooseType: {
      type: Number,
      default: 3 // 3: 3*3, 4: 4*4, 5: 5*5
    }
  },
  data () {
    return {
      touchedFlag: false, // 是否正在绘制
      canvas: null,
      ctx: null,
      radius: 0, // 计算后的半径大小
      style: {
        width: 375,
        height: 812,
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      devicePixelRatio: window.devicePixelRatio || 1,
      circleArr: [],
      lastPoint: [],
      restPoint: []
    }
  },
  mounted () {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    // this.canvas.width = this.style.width * this.devicePixelRatio
    // this.canvas.height = this.style.height * this.devicePixelRatio
    this.canvas.width = this.style.width
    this.canvas.height = this.style.height
    this.createCircle()
    this.bindEvent()
  },
  beforeDestroy () {
    this.canvas.removeEventListener('touchstart', this.onStartHandler)
    this.canvas.removeEventListener('touchmove', this.onMoveHandler)
    this.canvas.removeEventListener('touchend', this.onEndHandler)
  },
  methods: {
    drawPoint (style) {
      // 初始化圆心
      for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.fillStyle = style
        this.ctx.beginPath()
        this.ctx.arc(
          this.lastPoint[i].x,
          this.lastPoint[i].y,
          this.radius / 2.5,
          0,
          Math.PI * 2,
          true
        )
        this.ctx.closePath()
        this.ctx.fill()
      }
    },
    drawStatusPoint (type) {
      // 初始化状态线条
      for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.strokeStyle = type
        this.ctx.beginPath()
        this.ctx.arc(
          this.lastPoint[i].x,
          this.lastPoint[i].y,
          this.radius,
          0,
          Math.PI * 2,
          true
        )
        this.ctx.closePath()
        this.ctx.stroke()
      }
    },
    drawCircle (x, y) {
      // 初始化解锁密码面板 小圆圈
      this.ctx.strokeStyle = '#648F83' // 密码的点点默认的颜色
      this.ctx.lineWidth = 2
      this.ctx.beginPath()
      this.ctx.arc(x, y, this.radius, 0, Math.PI * 2, true) // 画圆
      this.ctx.closePath()
      this.ctx.stroke()
    },
    drawLine (style, position) {
      // style:颜色 解锁轨迹
      this.ctx.beginPath()
      this.ctx.strokeStyle = style
      this.ctx.lineWidth = 3
      this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y)

      for (var i = 1; i < this.lastPoint.length; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y)
      }
      this.ctx.lineTo(position.x, position.y)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    createCircle () {
      var n = this.chooseType
      var count = 0
      this.radius = this.ctx.canvas.width / (2 + 4 * n) // 公式计算
      this.lastPoint = []
      this.circleArr = []
      this.restPoint = []

      var r = this.radius

      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          count++
          const point = {
            x: j * 4 * r + 3 * r,
            y: i * 4 * r + 3 * r,
            index: count
          }
          this.circleArr.push(point)
          this.restPoint.push(point)
        }
      }

      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

      // 画9个圆
      console.log('this.circleArr =========', this.circleArr)
      console.log('this.restPoint =========', this.restPoint)
      for (let i = 0; i < this.circleArr.length; i++) {
        this.drawCircle(this.circleArr[i].x, this.circleArr[i].y)
      }
    },
    onStartHandler (e) {
      e.preventDefault() // 某些android 的 touchmove不宜触发 所以增加此行代码

      // 重置图案
      this.onReset()
      var position = this.getPosition(e)

      for (var i = 0; i < this.circleArr.length; i++) {
        if (
          Math.abs(position.x - this.circleArr[i].x) < this.radius &&
          Math.abs(position.y - this.circleArr[i].y) < this.radius
        ) {
          this.touchedFlag = true
          this.drawPoint(this.circleArr[i].x, this.circleArr[i].y)
          this.lastPoint.push(this.circleArr[i])
          this.restPoint.splice(i, 1)
          break
        }
      }
    },
    onMoveHandler (e) {
      if (this.touchedFlag) {
        this.onUpdateHandler(this.getPosition(e))
      }
    },
    onEndHandler (e) {
      if (this.touchedFlag) {
        this.touchedFlag = false
        this.$emit(
          'input',
          this.lastPoint.map(point => {
            return point.index
          })
        )
        // 重绘最后所有点
        this.onUpdateHandler(this.lastPoint[this.lastPoint.length - 1])
      }
    },
    onUpdateHandler (position) {
      // 核心变换方法在touchmove时候调用
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

      for (let i = 0; i < this.circleArr.length; i++) {
        // 每帧先把面板画出来
        this.drawCircle(this.circleArr[i].x, this.circleArr[i].y)
      }

      this.drawPoint('#648F83') // 每帧花轨迹
      this.drawStatusPoint('#648F83') // 每帧花轨迹

      this.drawLine('#648F83', position, this.lastPoint) // 每帧画圆心

      for (let i = 0; i < this.restPoint.length; i++) {
        if (
          Math.abs(position.x - this.restPoint[i].x) < this.radius &&
          Math.abs(position.y - this.restPoint[i].y) < this.radius
        ) {
          this.drawPoint(this.restPoint[i].x, this.restPoint[i].y)
          this.lastPoint.push(this.restPoint[i])
          this.restPoint.splice(i, 1)
          break
        }
      }
    },
    onReset () {
      this.createCircle()
    },
    bindEvent () {
      // 网页
      this.canvas.addEventListener('mousedown', this.onStartHandler)
      this.canvas.addEventListener('mousemove', this.onMoveHandler)
      this.canvas.addEventListener('mouseup', this.onEndHandler)
      // 移动端
      this.canvas.addEventListener('touchstart', this.onStartHandler)
      this.canvas.addEventListener('touchmove', this.onMoveHandler)
      this.canvas.addEventListener('touchend', this.onEndHandler)
    },
    getPosition (e) {
      // 获取touch点相对于canvas的坐标
      var rect = e.currentTarget.getBoundingClientRect()
      // var position = e.touches
      //   ? {
      //       x: (e.touches[0].clientX - rect.left) * this.devicePixelRatio,
      //       y: (e.touches[0].clientY - rect.top) * this.devicePixelRatio
      //     }
      //   : {
      //       x: (e.clientX - rect.left) * this.devicePixelRatio,
      //       y: (e.clientY - rect.top) * this.devicePixelRatio
      //     }
      var position = e.touches
        ? {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
          }
        : {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          }
      return position
    }
  }
}
</script>

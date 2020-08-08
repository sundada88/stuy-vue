
/* eslint-disable */
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 4,
    e: [1, 2, 3, 4],
    f: {
      g: 12
    }
  },
  d: [1, 2, 34]
}
const OAM = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
const callback = (newVal, oldVal) => {
  console.log('newVal: ' + newVal + '-------------------' + 'oldVal' + oldVal)
}
class Observe {
  constructor(obj, callback) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
      console.error('this first argument must a object' + obj)
      return
    }
    this.$callback = callback
    this.observe(obj)
  }

  observe (obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
      this.overrideArrayProto(obj)
    }
    Object.keys(obj).forEach(key => {
      let val = obj[key]
      Object.defineProperty(obj, key, {
        get: () => {
          return val
        },
        set: (newVal) => {
          this.$callback(newVal, val)
          val = newVal
        }
      })
      if (Object.prototype.toString.call(val) === '[object Object]' || Object.prototype.toString.call(obj) === '[object Object]') {
        this.observe(val)
      }
    })
  }

  overrideArrayProto (array) {
    const originalProto = Array.prototype
    const overrideProto = Object.create(Array.prototype)
    Object.keys(OAM).forEach((key, index) => {
      const method = OAM[index]
      let oldArr = []
      Object.defineProperty(overrideProto, method, {
        value: (...args) => {
          // console.log(this)
          oldArr = array.slice(0)
          originalProto[method].apply(array, args)
          this.observe(array)
          this.$callback(array, oldArr)
        },
        writable: true,
        enumerable: false,
        configurable: true
      })
    })
    array.__proto__ = overrideProto
  }
}
new Observe(obj, callback)
obj.a = 2
obj.c.d = 12
obj.d.push(12)
// obj.c.e.push(1234)
obj.c.e.pop()
console.log(obj)
console.log(obj.c.d)

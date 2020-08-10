
/* eslint-disable */
const originProto = Array.prototype
const overProto = Object.create(originProto)
const methods = ['push', 'pop', 'shift', 'unshift']
methods.forEach(method => {
  overProto[method] = function () {
    // alert(123)
    originProto[method].apply(this, arguments)
    console.log('数组发生了变化', this)
  }
})
function defineReactive (obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get () {
      console.log('get', val)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set', newVal)
        val = newVal
      }
    }
  })
}
function observe (obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  if (Array.isArray(obj)) {
    console.log(obj)
    obj.__proto__ = overProto
    const keys = Object.keys(obj)
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }
  } else {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }

}
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
const obj = {
  // a: 1,
  // b: 2,
  // c: 3,
  // d: {
  //   f: 123
  // },
  f: [1, 2, 3, 4, 5]
}
observe(obj)

// set(obj, 'uu', 12345)
// obj.uu
// obj.uu = 890

obj.f.push(112)
// console.log(obj.f)
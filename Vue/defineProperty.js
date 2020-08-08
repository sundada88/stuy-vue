
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
  if (Object.prototype.toString.call(obj) !== '[object Object]' || obj == null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    f: 123
  }
}
observe(obj)

set(obj, 'uu', 12345)
obj.uu
obj.uu = 890

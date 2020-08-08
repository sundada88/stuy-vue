
/* eslint-disable */
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 12
  }
}

function defineReactive (obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    get () {
      console.log('get====>', val)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set ===> ', newVal)
        observe(newVal)
        val = newVal
      }
    }
  })
}
// 这是为对象添加一个新的属性的时候
function set (obj, key, val) {
  defineReactive(obj, key, val)
}
function observe (obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
observe(obj)
obj.a = 2

obj.c.d = 123
console.log(obj.c.d)
set(obj, 'f', 12345)
obj.f

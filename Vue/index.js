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
        observe(newVal)
        val = newVal
      }
    }
  })
}
function observe (obj) {
  if (typeof obj !== 'object' || obj == null) {
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
  foo: 'foo',
  bar: 'bar',
  test: {
    test: 21
  }
}
observe(obj)
obj.foo = 'fooooooooooooo'
obj.test.test = 1234
obj.foo = {
  foo: 'foo'
}
obj.foo.foo = 12345
set(obj, 'baz', 'bza')
obj.baz = '123555'

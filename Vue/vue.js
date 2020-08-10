
/* eslint-disable */
function defineReactive (obj, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      console.log('get', val)
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        console.log('set', newVal)
        val = newVal
        // watchers.forEach(w => w.update())
        dep.notify()
      }
    }
  })
}
function observe (obj) {
  if (Object.prototype.toString.call(obj) !== '[object Object]' || obj == null) {
    return
  }
  new Observe(obj)

}
class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    observe(this.$data)
    this.proxy(this.$data)
    new Compiler(options.el, this)

  }
  proxy (data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return this.$data[key]
        },
        set (newVal) {
          this.$data[key] = newVal
        }
      })
    })
  }
}
class Observe {

  constructor(data) {
    this.$data = data
    this.walk(data)
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}

class Compiler {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile (el) {
    if (el.childNodes) {
      el.childNodes.forEach(node => {
        if (this.isElement(node)) {
          this.compileElem(node)
        } else if (this.isInter(node)) {
          this.compileText(node)
        }
        this.compile(node)
      })
    }
  }
  isElement (node) {
    return node.nodeType === 1
  }
  isInter (node) {
    return node.nodeType === 3 && /\{\{(.+)\}\}/.test(node.textContent)
  }
  compileText (node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  compileElem (node) {
    const attrs = node.attributes
    for (let attr of attrs) {
      const attrName = attr.name
      const exp = attr.value
      // 以s-开头
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
      // 以@开头
      if (this.isEvent(attrName)) {

        const dir = attrName.substring(1)
        // this[dir] && this[dir](node, exp)
        this.eventListener(node, exp, dir)
      }
    }
  }

  isDirective (attrName) {
    return attrName.startsWith('s-')
  }
  isEvent (attrName) {
    return attrName.startsWith('@')
  }
  text (node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  html (node, exp) {
    this.update(node, exp, 'html')
  }

  model (node, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', e => {
      this.$vm[exp] = e.target.value
    })
  }
  eventListener (node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
    node.addEventListener(dir, fn.bind(this.$vm))
  }

  update (node, exp, dir) {
    // 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
  textUpdater (node, value) {
    node.textContent = value
  }
  htmlUpdater (node, value) {
    node.innerHTML = value
  }
  modelUpdater (node, value) {
    node.value = value
  }
}
const watchers = []
class Watcher {
  constructor(vm, key, watchFn) {
    this.$vm = vm
    this.$key = key
    this.$watchFn = watchFn
    Dep.target = this
    this.$vm[this.$key]
    // watchers.push(this)
    Dep.target = null
  }
  update () {
    this.$watchFn.call(this.$vm, this.$vm[this.$key])
  }
}
class Dep {
  constructor() {
    this.deps = []
  }
  addDep (watcher) {
    this.deps.push(watcher)
  }
  notify () {
    this.deps.forEach(watcher => watcher.update())
  }
}

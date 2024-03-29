
/* eslint-disable */
function defineReactive (obj, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      Dep.target && dep.addDeps(Dep.target)
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        observe(newVal)
        val = newVal
        // watchers.forEach(w => w.update())
        dep.notify()
      }
    }
  })
}
function observe (obj) {
  if (typeof obj !== 'object' || obj == null) {
    return
  }
  new Observe(obj)
}
// const watchers = []
class Svue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    observe(this.$data)
    this.proxy()
    new Compiler(options.el, this)
  }
  proxy () {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        get () {
          return this.$data[key]
        },
        set (val) {
          this.$data[key] = val
        }
      })
    })
  }
}
// 每一个响应式对象，就伴生一个Observe对象
class Observe {
  constructor(data) {
    this.$data = data
    this.walk(this.$data)
  }
  walk (data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}
// 编译
class Compiler {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    this.$el && this.compile(this.$el)
  }
  compile (el) {
    const nodes = el.childNodes
    if (nodes) {
      for (let node of nodes) {
        if (this.isElement(node)) {
          this.compileElement(node)
        } else if (this.isInter(node)) {
          this.compileText(node)
        }
        this.compile(node)
      }
    }
  }
  isElement (node) {
    return node.nodeType === 1
  }
  isInter (node) {
    return node.nodeType === 3 && /\{\{(.+)\}\}/.test(node.textContent)
  }

  compileElement (node) {
    const attributes = node.attributes
    for (let att of attributes) {
      const attrName = att.name
      const exp = att.value
      // 这是以s-开头的属性
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
    }
  }
  isDirective (attrName) {
    return attrName.startsWith('s-')
  }
  compileText (node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  text (node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  html (node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }
  model (node, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', (e) => {
      this.$vm[exp] = e.target.value
    })
  }
  update (node, exp, type) {
    const fn = this[type + 'Updater']
    // 初始化视图
    fn && fn(node, this.$vm[exp])
    new Watcher(this.$vm, exp, (val) => {
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
  constructor(vm, key, fn) {
    this.$vm = vm
    this.$key = key
    this.$fn = fn
    // watchers.push(this)
    Dep.target = this
    this.$vm[this.$key]
    Dep.target = null
  }
  update () {
    this.$fn.call(this.$vm, this.$vm[this.$key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }
  addDeps (watcher) {
    this.deps.push(watcher)
  }
  notify () {
    this.deps.forEach(w => w.update())
  }
}

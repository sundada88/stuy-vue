
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
          if (newVal !== this.$data[key]) {
            this.$data[key] = newVal
          }
        }
      })
    })
  }
}
// 每一个对象都是一个OBserve实例
class Observe {
  constructor(data) {
    this.$data = data
    // 进行响应式操作
    this.walk(data)
  }
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
// 编译模板
class Compiler {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    this.$el && this.compiler(this.$el)
  }
  // 处理子节点
  compiler (el) {
    // 获取子节点
    if (el.childNodes) {
      el.childNodes.forEach(node => {
        if (this.isElement(node)) {
          // 元素类型的
          this.compilerEle(node)
        } else if (this.isInteger(node)) {
          // 差值表达式类型的
          this.compilerText(node)
        }
        // 递归处理子节点
        this.compiler(node)
      })
    }
  }
  compilerEle (node) {
    const attributes = node.attributes
    // 处理元素的属性
    for (let attribute of attributes) {
      // s-text = 'counter' @click='handleClick'
      // s-text  @click
      const attrName = attribute.name
      // counter  handleClick
      const exp = attribute.value
      // 以s-开头的指令
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, exp)
      }
      /// 以@开头
      if (this.isEvent(attrName)) {
        const dir = attrName.substring(1)
        this.handleEvent(node, exp, dir)
      }
    }
  }
  compilerText (node) {
    // 需要通知
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')

  }
  text (node, exp) {
    // 需要通知
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  html (node, exp) {
    // 需要通知
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }
  model (node, exp) {
    this.update(node, exp, 'model')
    node.addEventListener('input', (e) => {
      this.$vm[exp] = e.target.value
    })
  }
  handleEvent (node, exp, dir) {
    node.addEventListener(dir, this.$vm.$options.methods[exp].bind(this.$vm))
  }
  // 通知函数
  update (node, exp, type) {
    const fn = this[type + 'Updater']
    // 初始化
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
  isElement (node) {
    return node.nodeType === 1
  }
  isInteger (node) {
    return node.nodeType === 3 && /\{\{(.+)\}\}/.test(node.textContent)
  }
  isDirective (attrName) {
    return attrName && attrName.startsWith('s-')
  }
  isEvent (attrName) {
    return attrName.startsWith('@')
  }
}
// const watchers = []
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
    // this.deps.forEach(w => w.update())
    this.deps.forEach(w => w.update()
    )
  }
}
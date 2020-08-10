/* eslint-disable */
function defineReactive (obj, key, val) {
  observe(val)
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get () {
      // Dep.target && console.log(dep)
      Dep.target && dep.addDep(Dep.target)
      // Dep.target && console.log('sundadadada')
      return val
    },
    set (newVal) {
      if (newVal !== val) {
        observe(newVal)
        val = newVal
        dep.notify()
        // watchers.forEach(w => w.update(val))
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
    this.$methods = options.methods
    observe(this.$data)
    observe(this.$methods)
    this.proxy(this.$data)
    new Compiler(options.el, this)
  }
  // 给vue实例做代理
  proxy (obj) {
    Object.keys(obj).forEach(key => {
      Object.defineProperty(this, key, {
        get: () => {
          return this.$data[key]
        },
        set: (newVal) => {
          this.$data[key] = newVal
        }
      })
    })
  }
}
// 每一个响应式对象，就伴生一个Observe对象
class Observe {
  // 处理两个不同类型的值，数组和对象
  constructor(value) {
    this.value = value
    // 应该判断value的类型来进行不同的操作
    this.walk(value)
  }
  walk (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
// 编译
class Compiler {
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    if (this.$el) {
      this.compile(this.$el)
    }
  }
  compile (el) {
    el.childNodes.forEach(node => {
      if (this.isElement(node)) {
        // 元素节点
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // 差值表达式{{}}
        this.compileText(node)
      }
      // 子元素进行遍历
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  isElement (node) {
    return node.nodeType === 1
  }

  isInter (node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileElement (node) {
    if (node.attributes.length > 0) {
      for (let attribute of node.attributes) {
        const attrName = attribute.name
        const exp = attribute.value
        // 判断这个类型属性是属于什么类型,以s-开头
        if (this.isDirective(attrName)) {
          const dir = attrName.substring(2)
          this[dir] && this[dir](node, exp)
        } else if (this.isListener(attrName)) {
          const dir = attrName.substring(1)

          // 分类进行讨论@click="handleClick"和@click="handleClick(counter)"
          if (/(.*)\((.*)\)/g.test(exp)) {
            console.log(RegExp.$1, RegExp.$2)
            this[dir + 'Handler'] && this[dir + 'Handler'](node, dir, RegExp.$1, RegExp.$2)
          } else { // @click="handleClick"
            this[dir + 'Handler'] && this[dir + 'Handler'](node, dir, exp)
          }
        }
      }
    }
  }
  // 判断以s-开头的属性
  isDirective (attrName) {
    return attrName.startsWith('s-')
  }
  isListener (attrName) {
    return attrName.startsWith('@')
  }
  text (node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  html (node, exp) {
    // console.log(this.$vm[exp])
    // node.innerHTML = this.$vm[exp]

    this.update(node, exp, 'html')
  }
  compileText (node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  // 处理@click事件
  clickHandler (node, dir, exp, param) {
    console.log(exp)
    console.log(param)
    // this.$vm.$methods[exp].call(this.$vm)
    console.log(param)
    if (param) {
      console.log(param)
      if (param.startsWith("'") || param.startsWith('"')) {
        node.addEventListener(dir, () => {
          console.log(param.slice(1, param.length - 1))
          this.$vm.$methods[exp].call(this.$vm, param.slice(1, param.length - 1))
        })
      } else {
        console.log(1234567)
        if (/\,/.test(param)) {
          // const arr = param.split(',')
          // const obj = arr.reduce((prev, current) => {

          // }, {})
          // // console.log(ar)
          // node.addEventListener('click', () => {
          //   this.$vm.$methods[exp].apply(this.$vm, ar)
          // })
        } else {
          node.addEventListener(dir, () => {
            console.log(this.$vm[param])
            this.$vm.$methods[exp].call(this.$vm, this.$vm[param])
          })
        }
      }
    } else {
      node.addEventListener(dir, () => {
        this.$vm.$methods[exp].call(this.$vm, ...arguments)
      })
    }
  }
  // 当响应式值被使用的时候，创建watcher
  update (node, exp, dir) {
    const fn = this[dir + 'Updater']
    // 初始化渲染
    fn && fn(node, this.$vm[exp])
    // 更新时渲染
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
  htmlUpdater (node, value) {
    node.innerHTML = value
  }
  textUpdater (node, value) {
    node.textContent = value
  }
}
class Watcher {
  constructor(vm, key, updateFn) {
    this.$vm = vm
    this.$key = key
    this.$updateFn = updateFn
    // watchers.push(this)
    Dep.target = this
    this.$vm[this.$key]
    Dep.target = null
  }
  update () {
    this.$updateFn.call(this.$vm, this.$vm[this.$key])
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

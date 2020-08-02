
import Vue from 'vue'
export const create = function (component, propsData) {
  // 使用Vue
  // console.log(component)
  // const instance = new Vue({
  //   render (h) {
  //     return h(component, { props })
  //   }
  // }).$mount()
  // const el = instance.$el
  // console.log(el)
  // document.body.appendChild(el)
  // const comp = instance.$children[0]
  // comp.remove = () => {
  //   console.log(el)
  //   document.body.removeChild(instance.$el)
  //   instance.$destroy()
  // }
  // return comp
  // 使用extend
  const Instance = Vue.extend(component)
  const vm = new Instance({ propsData })
  vm.$mount()
  document.body.appendChild(vm.$el)
  vm.remove = () => {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return vm
}

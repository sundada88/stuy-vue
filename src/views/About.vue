<template>
  <div class="about">
    <h1 @click="handleClick">This is an about page</h1>
    <h1 @click="handleAdd">{{ $store.state.count }}</h1>
    <h1 @click="handleAddAsync">async: {{ $store.state.count }}</h1>
    <h1>{{ $store.getters.doubleCount }}</h1>
    <!-- <router-view></router-view> -->
    <!-- <test v-model="gestureData"></test> -->
    <!-- <index>
      <yang></yang>
    </index> -->
  </div>
</template>

<script>
/* eslint-disable */
import test from './about/index'
import index from './about/index1.vue'
import yang from './about/indexTest.vue'
export default {
  name: 'xxxxx',
  // props: {
  //   key: String
  // },
  inject: ['app'],
  data () {
    return {
      test: 1,
      gestureData: []
    }
  },
  components: {
    test,
    index,
    yang
  },
  watch: {
    gestureData (newVal) {
      console.log(newVal)
    }
  },
  // computed: {
  //   handel () {
  //     return
  //   }
  // }
  methods: {
    handleClick () {
      console.log('执行了 handleclick 函数')
      console.log(this.app)
      this.app.handleProvide()
    },
    handleAdd () {
      this.$store.commit('add', 2)
    },
    handleAddAsync () {
      this.$store.dispatch('addAsync')
    }
  },
  mounted () {
    // console.log(this)
    // console.log(this === this.$vnode.child)
    // console.log(this.$vnode)
    console.log('this ===================>', this)
  }
}
</script>

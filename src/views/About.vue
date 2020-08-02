<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="handleAdd">{{$store.state.count}}</h1>
    <h1 @click="handleAddAsync">async: {{$store.state.count}}</h1>
    <h1>{{$store.getters.doubleCount}}</h1>
  </div>
</template>

<script>
export default {
  // computed: {
  //   handel () {
  //     return
  //   }
  // }
  methods: {
    handleAdd () {
      this.$store.commit('add', 2)
    },
    handleAddAsync () {
      this.$store.dispatch('addAsync')
    }
  }
}
</script>

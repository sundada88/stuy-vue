<template>
  <div style="height: 400px;width: 200px; margin: 0 auto;">
    <list
      :loading.sync="loading"
      @load="load"
      :finished='finished'
    >
      <h1
        v-for="i in arr"
        :key="i"
      >{{i}}</h1>
    </list>
  </div>
</template>

<script>
import list from './list.vue'
export default {
  components: {
    list
  },
  data () {
    return {
      loading: false,
      finished: false,
      arr: [0, 1, 2, 3, 4]
    }
  },
  methods: {
    load () {
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.arr.push(this.arr.length)
        }
        this.loading = false
        if (this.arr.length >= 40) {
          this.finished = true
        }
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

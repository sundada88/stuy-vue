<template>
  <div style="height: 300px; background: pink; margin: 0 auto; width: 200px;">
    <pull-refresh v-model="loading">
      <h1>aaaaaaaaaaaaa</h1>
    </pull-refresh>
  </div>
</template>

<script>
import pullRefresh from './main.vue'
export default {
  components: {
    pullRefresh
  },
  watch: {
    loading (newVal) {
      console.log('loading', newVal)
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    handleInput (newVal) {
      console.log(this.loading)
      console.log('handleInput', newVal)
    }
  }
}
</script>

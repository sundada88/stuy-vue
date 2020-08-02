<template>
  <div class="hello">
    <Child1>
      <template v-slot:test="{haha}">{{haha}}</template>
    </Child1>
    1: {{$attrs.msg}}
    2: {{msg}}
    <div @click="handleClick">
      这是一个按钮
    </div>
  </div>
</template>

<script>
import Child1 from './Child1.vue'
export default {
  name: 'child',
  props: {
    msg: String
  },
  data () {
    return {
      haha: 'undadada'
    }
  },
  methods: {
    handleClick () {
      this.$emit('test', '这是来自儿子的内容')
    }
  },
  components: {
    Child1
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

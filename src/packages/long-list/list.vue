<template>
  <virtual-list
    :size="40"
    :keeps="8"
    :arrayData="list"
  >
    <template #default="{ item }">
      <div style="border: 1px solid cadetblue;">
        {{item.id}}: {{ item.value }}
      </div>
    </template>
  </virtual-list>
</template>

<script>
import VirtualList from './list-item.vue'
import Mock from 'mockjs'
const list = []
for (let i = 0; i < 50; i++) {
  list.push({
    id: i,
    value: Mock.Random.cparagraph(5, 10)
  })
}
export default {
  name: 'App',
  components: {
    VirtualList
  },
  data () {
    return { list }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

<template>
  <div style="width: 100vw;">
    <!-- <div style="padding: 20px"></div> -->
    <!-- <collapse v-model="test">
      <collapse-item title="这是一个测试" name="1">
        hahahahhahah
      </collapse-item>
      <collapse-item title="这是一个测试" name="2">
        hahahahhahah2
      </collapse-item>
      <collapse-item title="这是一个测试" name="3">
        hahahahhahah3
      </collapse-item>
    </collapse>-->
    <div style="margin-top: 100px;"></div>
    <list></list>
    <!-- <sunlist
      style="height: 400px"
      :list="list"
      :size="40"
      :keeps="8"
    >
      <template #default="{ item }">
        <div style="padding: 20px;border: 1px solid red;">{{ item.id }}: {{ item.value }}</div>
        <div style="height: 40px;box-sizing: border-box; border: 1px solid red;">{{ item.id }}</div>
      </template>
    </sunlist> -->
  </div>
</template>

<script>
/* eslint-disable */
// import collapse from './test/collapse.vue'
// import collapseItem from './test/collapse-item.vue'
import list from './long-list/list.vue'
import Sunlist from './long-list-sun/list.vue'
import Mock from 'mockjs'
const llist = []
for (let i = 0; i < 500; i++) {
  llist.push({
    id: i,
    value: Mock.Random.cparagraph(5, 10)
    // value: i
  })
}
export default {
  data () {
    return {
      show: true,
      sliderValue: 20,
      percentage: 10,
      value: true,
      test: ['1'],
      list: llist
    }
  },
  components: {
    list,
    Sunlist
    // collapse,
    // collapseItem
  },
  methods: {
    handleChange (value) {
      console.log('改变了的值是', value)
    }
  }
}
</script>

<style>
body {
  margin: 0;
  margin-top: 20px;
}
.colB {
  background: red;
}
.colA {
  background: green;
}
</style>

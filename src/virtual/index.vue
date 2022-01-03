<template>
  <div>
    <div class="box">
      <virtual :listData="arr" :estimatedItemSize="30">
        <!-- <virtual :keeps="10" :arrayData="arr" :variable="true" :size="30"> -->
        <template v-slot:default="{ item }">
          <div :class="item.id % 2 === 0 ? `item-0` : `item-1`">{{ item.title }}</div>
        </template>
      </virtual>
    </div>

    <!-- <virtual :list="arr"></virtual> -->
    <div class="box">
      <virtual-list
        class="list-dynamic scroll-touch"
        :data-key="'id'"
        :data-sources="arr"
        :data-component="itemComponent"
        :estimate-size="20"
        :item-class="'list-item-dynamic'"
      />
    </div>
  </div>
</template>

<script>
import virtual from './virtual4.vue'
import Item from './src/Item.vue'
import './src/index'
export default {
  components: {
    virtual
  },
  data () {
    return {
      arr: [
      ],
      itemComponent: Item
    }
  },
  created () {
    // let i = 0
    // setInterval(() => {
    //   if (this.arr.length < 100) {
    //     this.arr.push({
    //       title: `title title title title${i++}`,
    //       id: i++
    //     })
    //   }
    // }, 1000)
    for (let i = 0; i < 100; i++) {
      this.arr.push({
        title: `title title title title${i}`,
        id: i + ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 300px;
  border: 1px solid pink;
  overflow: scroll;
}
.setItem(1);
.setItem(@n, @i: 0) when (@i <= @n) {
  .item-@{i} {
    height: 20px * (@i + 1);
    line-height: 20px * (@i + 1);
    border: 1px solid pink;
    margin-top: 5px;
    box-sizing: border-box;
  }

  .setItem(@n, @i + 1);
}
</style>

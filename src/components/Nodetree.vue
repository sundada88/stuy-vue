
<template>
  <div :style="{paddingLeft: `${level * 20}px`}">
    <label>{{model.title}}</label>

    <div>
      <nodetree v-for="item in model.children"
                :model="item"
                :key="item.title"
                :level="level + 1"></nodetree>
    </div>
  </div>
</template>

<script>
export default {

  name: 'nodetree',
  props: {
    model: Object,
    level: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>
</style>

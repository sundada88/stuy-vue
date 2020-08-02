<template>
  <div v-show="show">
    <div class="header"
         @click="emitClose">
      删除
    </div>
    <div>
      这是一条提示信息
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    emitClose () {
      this.$emit('update:show', false)
    }
  }

}
</script>

<style scoped>
.header {
  background: red;
}
</style>

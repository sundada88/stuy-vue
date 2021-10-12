<template>
  <div ref="scrollWrap" class="scrollWrap" @scroll="handleScroll">
    <div ref="scrollHead" class="scrollHead"></div>
    <div ref="scrollContent" class="scrollContent" :style="{transform: `translateY(${offset}px)`}">
      <list-item @handleMounted="handleMounted" v-for="(item, index) in validateData" :key="index" :index="index" :item="item">
        <template #default="{item}">
          <slot :item="item"></slot>
        </template>
      </list-item>
    </div>
  </div>
</template>

<script>
import ListItem from './list-item.vue'
export default {
  name: 'list',
  data () {
    return {
      isMounted: false,
      offset: 0,
      start: 0,
      end: this.keeps
    }
  },
  props: {
    list: Array,
    size: Number,
    keeps: Number
  },
  computed: {
    validateData () {
      // 未加上缓存相关
      // return this.list.slice(this.start, this.end)
      const prevCount = Math.min(this.start, this.keeps)
      const renderStart = this.start - prevCount
      const nextCount = Math.min(this.list.length - this.end, this.keeps)
      const renderEnd = this.end + nextCount
      return this.list.slice(renderStart, renderEnd)
    }
  },
  components: {
    ListItem
  },
  methods: {
    handleMounted ({ index, height }) {
      if (!this.isMounted) {
        console.log(index, height)
        this.isMounted = true
      }
    },
    handleScroll () {
      const scrollTop = this.$refs.scrollWrap.scrollTop
      // 未加上缓存相关
      // this.start = Math.ceil(scrollTop / this.size) - 1 >= 0 ? Math.ceil(scrollTop / this.size) - 1 : 0
      // this.end = this.start + this.keeps
      // this.offset = this.start * this.size
      this.start = Math.ceil(scrollTop / this.size) - 1 >= 0 ? Math.ceil(scrollTop / this.size) - 1 : 0
      this.prevCount = Math.min(this.start, this.keeps)
      this.end = this.start + this.keeps
      this.offset = (this.start - this.prevCount) * this.size
    }
  },
  mounted () {
    this.$refs.scrollHead.style.height = this.list.length * this.size + 'px'
    this.$refs.scrollWrap.style.height = this.size * this.keeps + 'px'
  }
}
</script>

<style scoped>
.scrollWrap {
  position: relative;
  overflow-y: scroll;
}
.scrollContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>

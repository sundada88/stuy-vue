<template>
  <div id="app">
    <Nodetree :model="model"></Nodetree>
    <!-- <keep-alive>
      <component :is='currentComp'></component>
    </keep-alive> -->
    <!-- <button @click="changeComp">按钮</button> -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import Home from './views/Home'
import About from './views/About'
import Nodetree from '@/components/Nodetree'
export default {
  data () {
    return {
      model: {
        title: '1',
        children: [
          {
            title: '1-2',
            children: [
              {
                title: '1-2-1'
              },
              {
                title: '1-2-2'
              }
            ]
          }, {
            title: '1-3'
          }, {
            title: '1-4'
          }
        ]
      },
      currentComp: Home
    }
  },
  components: {
    Nodetree
  },
  methods: {
    changeComp () {
      if (this.currentComp.name === 'Home') {
        this.currentComp = About
      } else {
        this.currentComp = Home
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

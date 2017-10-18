<template>
  <div id="app">
    <header-component v-bind:user="computeUser()"></header-component>
    <router-view v-bind:user="computeUser()"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'app',
  components: {
    'header-component': Header
  },
  methods: {
    computeUser: () => true
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 20px;
}
</style>

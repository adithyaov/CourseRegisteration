<template>
  <div id="app">
    <header-component :logOut="logOut" :user="user" :updateToken="updateToken"></header-component>
    <router-view v-bind:user="user"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
import * as axios from 'axios'
export default {
  name: 'app',
  components: {
    'header-component': Header
  },
  beforeMount () {
    this.logOut()
  },
  data () {
    return {
      token: 0,
      user: false
    }
  },
  methods: {
    updateToken: function (token) {
      this.token = token
    },
    logOut: async function () {
      try {
        var res = await axios.post('/user/logout', null)
        if (res.data.user === false) {
          this.user = false
        } else {
          alert('Something wrong with the server while Logging out.')
        }
      } catch (e) {
        alert(e)
      }
    }
  },
  watch: {
    token: async function () {
      try {
        alert('Logging in')
        var postData = {
          token: this.token
        }
        var res = await axios.post('/user/authenticate', postData)
        alert(JSON.stringify(postData))
        alert(JSON.stringify(res))
        if (res.data.user) {
          this.user = {
            name: res.data.user.name,
            type: res.data.user.type,
            email: res.data.user.email
          }
          this.$router.push('/')
        } else {
          this.logOut()
        }
      } catch (e) {
        alert(e)
      }
    }
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

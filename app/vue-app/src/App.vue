<template>
  <div>
    <div v-if="loaderState" class="loading">
      <div class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
    </div>
    <div id="app">
      <header-component :logOut="logOut" :heavenProp="heavenProp()" :updateToken="updateToken"></header-component>
      <router-view :heavenProp="heavenProp()"></router-view>
    </div>
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
      loaderState: false,
      token: 0,
      user: {
        type: 'unknown'
      }
    }
  },
  methods: {
    heavenProp: function () {
      return {
        user: this.user,
        checkScore: this.checkScore,
        setLoaderState: this.setLoaderState
      }
    },
    setLoaderState: function (loaderState) {
      this.loaderState = loaderState
    },
    checkScore: function (type) {
      switch (type) {
        case 'user': return 1
        case 'owner': return 2
        case 'admin': return 3
        default: return 0
      }
    },
    updateToken: function (token) {
      this.token = token
    },
    logOut: async function () {
      try {
        var res = await axios.post('/user/logout', null)
        if (res.data.user === false) {
          this.user = {
            type: 'unknown'
          }
        } else {
          alert('[ERROR] Could\'nt Sign Out')
        }
      } catch (e) {
        alert('[DEBUG] ' + e)
      }
    }
  },
  watch: {
    token: async function () {
      try {
        this.setLoaderState(true)
        var postData = {
          token: this.token
        }
        var res = await axios.post('/user/authenticate', postData)
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
        this.setLoaderState(false)
      } catch (e) {
        alert('[DEBUG] ' + e)
        this.setLoaderState(false)
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
}
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;
  color: #333;
  background-color: #fff;
  top:0;
  left:0;
  -webkit-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  -ms-transition: all 300ms ease-in-out;
  -o-transition: all 300ms ease-in-out;
  transition: all 300ms ease-in-out;
  padding-top: 100px;
  z-index: 100;
}

.spinner {
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
}

.double-bounce1, .double-bounce2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}
</style>

<template>
  <div>
    <div v-if="loaderState" class="loading">
      <span>
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </span>
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
  color: #000;
  background-color: #fff;
  top:0;
  left:0;
  -webkit-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  -ms-transition: all 300ms ease-in-out;
  -o-transition: all 300ms ease-in-out;
  transition: all 300ms ease-in-out;
  vertical-align: middle;
  line-height: 200px;
  z-index: 100;
}
.loading span {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  padding: 0
}

.spinner {
  margin: 100px auto;
  width: 50px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.spinner > div {
  background-color: #333;
  height: 100%;
  width: 6px;
  display: inline-block;

  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner .rect2 {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.spinner .rect3 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

.spinner .rect4 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.spinner .rect5 {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8s;
}

@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
  20% { -webkit-transform: scaleY(1.0) }
}

@keyframes sk-stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
}
</style>

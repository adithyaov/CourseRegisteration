<template>
  <div>
    <!-- <ul class="nav">
      <li class="left">Home</li>
      <li class="left" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1"><router-link class="navbar-item" :to="{ path: '/my-courses' }">My Courses</router-link></li>
      <li class="left" v-if="heavenProp.checkScore(heavenProp.user.type) >= 2"><router-link class="navbar-item" :to="{ path: '/course' }">Courses</router-link></li>
      <li class="left" v-if="heavenProp.checkScore(heavenProp.user.type) >= 2"><a><router-link class="navbar-item" :to="{ path: '/group' }">Groups</router-link></a></li>
      <li class="right" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1"><a v-on:click="logOut">Sign Out</a></li>
      <li class="right" v-else="heavenProp.checkScore(heavenProp.user.type) >= 1"><g-signin-button @done="onUserLoggedIn"/></li>
    </ul> -->
    <nav style="z-index:101" class="navbar is-transparent is-primary">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" :to="{ path: '/' }">
            IIT Pkd logo
          </router-link>
        </div>

        <div class="navbar-menu is-active">
          <div class="navbar-start">
            <router-link v-if="heavenProp.checkScore(heavenProp.user.type) >= 1" class="navbar-item" :to="{ path: '/my-courses' }">
              My Courses
            </router-link>
            <router-link v-if="heavenProp.checkScore(heavenProp.user.type) >= 2" class="navbar-item" :to="{ path: '/course' }">
              Courses
            </router-link>
            <router-link v-if="heavenProp.checkScore(heavenProp.user.type) >= 2" class="navbar-item" :to="{ path: '/group' }">
              Groups
            </router-link>
            <router-link v-if="heavenProp.checkScore(heavenProp.user.type) >= 2" class="navbar-item" :to="{ path: '/bulk' }">
              Bulk Post
            </router-link>
            <router-link v-if="heavenProp.checkScore(heavenProp.user.type) >= 3" class="navbar-item" :to="{ path: '/promote' }">
              Promote
            </router-link>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1">
                  <a class="bd-tw-button button is-primary" v-on:click="logOut">
                    <span class="icon">
                      <i class="fa fa-google"></i>
                    </span>
                    <span>
                      Sign Out
                    </span>
                  </a>
                </p>
                <p class="control" v-else="heavenProp.checkScore(heavenProp.user.type) >= 1">
                  <g-signin-button @done="onUserLoggedIn"/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import GoogleSignIn from './GoogleSignIn'
  export default {
    props: ['heavenProp', 'updateToken', 'logOut'],
    name: 'header-component',
    components: {
      'g-signin-button': GoogleSignIn
    },
    methods: {
      onUserLoggedIn: function (googleUser) {
        var token = googleUser.getAuthResponse().id_token
        this.updateToken(token)
      }
    }
  }
</script>

<style scoped>

</style>

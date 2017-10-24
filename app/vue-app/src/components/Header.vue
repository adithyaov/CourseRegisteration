<template>
  <div>
    <ul class="nav">
      <li class="left"><router-link :to="{ path: '/' }">Home</router-link></li>
      <li class="left" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1"><router-link :to="{ path: '/my-courses' }">My Courses</router-link></li>
      <li class="left" v-if="heavenProp.checkScore(heavenProp.user.type) >= 2"><router-link :to="{ path: '/course' }">Courses</router-link></li>
      <li class="left" v-if="heavenProp.checkScore(heavenProp.user.type) >= 2"><a><router-link :to="{ path: '/group' }">Groups</router-link></a></li>
      <li class="right" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1"><a v-on:click="logOut">Sign Out</a></li>
      <li class="right" v-else="heavenProp.checkScore(heavenProp.user.type) >= 1"><g-signin-button @done="onUserLoggedIn"/></li>
    </ul>
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
  .nav {
    margin: 0;
    padding: 0;
  }
  .nav li {
    text-decoration: none;
    display: inline;
  }
  .left{
    margin: 0;
    margin-right: 20px;
  }
  .right {
    float: right;
    margin: 0;
    margin-left: 20px;
  }
</style>

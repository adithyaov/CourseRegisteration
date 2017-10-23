<template>
  <div>
    <ul class="nav">
      <li class="left"><router-link :to="{ path: '/' }">Home</router-link></li>
      <li class="left" v-if="user"><router-link :to="{ path: '/my-courses' }">My Courses</router-link></li>
      <li class="left" v-if="user"><router-link :to="{ path: '/course' }">Courses</router-link></li>
      <li class="left" v-if="user"><a><router-link :to="{ path: '/group' }">Groups</router-link></a></li>
      <li class="left"><a>Contact</a></li>
      <li class="right" v-if="user"><a v-on:click="logOut">Sign Out</a></li>
      <li class="right" v-else="user"><g-signin-button @done="onUserLoggedIn"/></li>
    </ul>
  </div>
</template>

<script>
  import GoogleSignIn from './GoogleSignIn'
  export default {
    props: ['user', 'updateToken', 'logOut'],
    name: 'header-component',
    components: {
      'g-signin-button': GoogleSignIn
    },
    methods: {
      onUserLoggedIn: function (googleUser) {
        var profile = googleUser.getBasicProfile()
        var token = googleUser.getAuthResponse().id_token
        alert(token)
        alert('ID: ' + profile.getId()) // Do not send to your backend! Use an ID token instead.
        alert('Name: ' + profile.getName())
        alert('Image URL: ' + profile.getImageUrl())
        alert('Email: ' + profile.getEmail())
        this.updateToken(token)
        alert('updated')
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

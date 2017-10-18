<template>
  <div>
    <ul class="nav">
      <li class="left"><a>Home</a></li>
      <li class="left" v-if="user"><a>Courses</a></li>
      <li class="left" v-if="user"><a>Groups</a></li>
      <li class="left"><a>Contact</a></li>
      <li class="right" v-if="user"><a>Logout</a></li>
      <li class="right" v-else="user"><a>Login</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ['user'],
    name: 'header-component'
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

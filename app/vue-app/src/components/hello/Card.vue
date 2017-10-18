<template>
  <div v-bind:style="{'border-color': statusColor}" class="card">
    <h5 class="code">{{code}}</h5>
    <div><b>Name:</b> {{name}}</div>
    <div><b>Credits:</b> {{credits}}</div>
    <div><b>Contact:</b> {{contact}}</div>
    <div><b>Instructor:</b> {{instructor}}</div>
    <div class="options">
      <a v-if="!status" v-on:click="joinCourse">Join</a>
      <a v-if="status" v-on:click="leaveCourse">Leave</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id', 'name', 'code', 'credits', 'contact', 'instructor'],
    name: 'hello-card-component',
    data () {
      return {
        status: false
      }
    },
    computed: {
      statusColor: function () {
        if (this.status) {
          return '#2c8898'
        } else {
          return '#c0c0c0'
        }
      }
    },
    methods: {
      joinCourse: function (event) {
        this.status = true
      },
      leaveCourse: function (event) {
        this.status = false
      }
    }
  }
</script>

<style scoped>
  .code {
    margin: 0;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .options {
    position: absolute;
    top: 12px;
    right: 0;
  }
  .options a {
    margin-right: 20px;
  }
  .card {
    position: relative;
    border: 0;
    border-left: 4px solid #c0c0c0;
    padding: 10px;
    margin-top: 30px;
    background-color: #fff;
  }
</style>

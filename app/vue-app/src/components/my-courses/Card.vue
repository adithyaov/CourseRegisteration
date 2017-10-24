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
  import * as axios from 'axios'
  export default {
    props: ['id', 'name', 'code', 'credits', 'contact', 'instructor', 'joined', 'heavenProp'],
    name: 'my-courses-card-component',
    data () {
      return {
        status: this.joined
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
      joinCourse: async function (event) {
        try {
          var res = await axios.post('/course/join/' + this.id, null)
          if (res.data.joined === true) {
            this.status = true
          } else {
            alert('[ERROR] Could not join course')
          }
        } catch (e) {
          alert('[DEBUG] ' + e)
        }
      },
      leaveCourse: async function (event) {
        try {
          var res = await axios.post('/course/leave/' + this.id, null)
          if (res.data.left === true) {
            this.status = false
          } else {
            alert('[ERROR] Could not leave course')
          }
        } catch (e) {
          alert('[DEBUG] ' + e)
        }
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

<template>
  <div v-bind:style="{'border-color': statusColor}" class="card modified-card">
    <header class="card-header">
      <div class="card-header-title">
        {{code}}
      </div>
      <div class="card-header-icon">
        <a v-if="!status" v-on:click="joinCourse">Join</a>
        <a v-if="status" v-on:click="leaveCourse">Leave</a>
      </div>
    </header>
    <div class="card-content">
      <div class="content">
        <div><b>Name:</b> {{name}}</div>
        <div><b>Credits:</b> {{credits}}</div>
        <div><b>Contact:</b> {{contact}}</div>
        <div><b>Instructor:</b> {{instructor}}</div>
      </div>
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
          return '#999999'
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
  .modified-card {
    border-left: 2px solid #c0c0c0;
    margin-bottom: 10px;
  }
  .modified-card .card-header-icon a {
    margin-left: 10px;
  }
</style>

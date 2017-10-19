<template>
  <div>
    <h2>My Courses.</h2>
    <div class="hello">
      <blockquote v-if="!user">
        <p>Please login to view your courses :-)</p>
      </blockquote>
      <div v-if="user">
        <card-component v-for="c in courses"
          v-bind:key="c.id"
          v-bind:id="c.id"
          v-bind:name="c.name"
          v-bind:code="c.code"
          v-bind:credits="c.credits"
          v-bind:instructor="c.instructor"
          v-bind:contact="c.contact"
          v-bind:joined="c.joined"
        ></card-component>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './hello/Card'
  import * as axios from 'axios'
  export default {
    props: ['user'],
    name: 'hello-component',
    beforeMount () {
      this.getCourses()
    },
    data () {
      return {
        courses: [
          {
            id: 3,
            name: 'Test',
            code: 'CS6654',
            credits: 5,
            instructor: 'Dr. Sahely',
            contact: 'sahely@ml.com',
            target: ['G1', 'G2', 'G3', 'G4']
          }
        ]
      }
    },
    components: {
      'card-component': Card
    },
    methods: {
      getCourses: async function () {
        try {
          alert('Getting Data')
          var res = await axios.get('/course/list')
          this.courses = res.data.courses
        } catch (e) {
          alert('Something wrong with the server.')
        }
      }
    }
  }
</script>

<style scoped>
  .hello {
    margin-top: 30px;
  }
</style>

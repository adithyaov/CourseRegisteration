<template>
  <div>
    <h2>My Courses.</h2>
    <div class="main">
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
  import Card from './my-courses/Card'
  import * as axios from 'axios'
  export default {
    props: ['user'],
    name: 'my-courses-component',
    beforeMount () {
      if (this.user) {
        this.getCourses()
      }
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
          if (res.data.courses) {
            var dataCourses = res.data.courses.map((c) => {
              return {
                id: c.id,
                name: c.name,
                code: c.code,
                instructor: c.instructor,
                credits: c.credits,
                contact: c.contact
              }
            })
            this.courses = dataCourses
          } else {
            throw Error('Something wrong with the server.')
          }
        } catch (e) {
          alert('Something wrong with the server.')
        }
      }
    }
  }
</script>

<style scoped>
  .main {
    margin-top: 30px;
  }
</style>

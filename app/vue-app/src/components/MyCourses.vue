<template>
  <div>
    <h2>My Courses.</h2>
    <div class="main">
      <blockquote v-if="heavenProp.checkScore(heavenProp.user.type) <= 0">
        <p>Please login to view your courses :-)</p>
      </blockquote>
      <div v-if="heavenProp.checkScore(heavenProp.user.type) >= 1">
        <blockquote v-if="courses.length === 0">
          <p>You don't have any courses yet.</p>
        </blockquote>
        <card-component v-if="courses.length > 0" v-for="c in courses"
          v-bind:heavenProp="heavenProp"
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
    props: ['heavenProp'],
    name: 'my-courses-component',
    beforeMount () {
      if (this.heavenProp.checkScore(this.heavenProp.user.type) >= 1) {
        this.getCourses()
      } else {
        this.$router.push('/')
      }
    },
    data () {
      return {
        courses: []
      }
    },
    components: {
      'card-component': Card
    },
    methods: {
      getCourses: async function () {
        try {
          this.heavenProp.setLoaderState(true)
          var res = await axios.get('/course/list')
          if (res.data.courses) {
            var dataCourses = res.data.courses.map((c) => {
              return {
                id: c.id,
                name: c.name,
                code: c.code,
                instructor: c.instructor,
                credits: c.credits,
                contact: c.contact,
                joined: c.joined
              }
            })
            this.courses = dataCourses
          } else {
            alert('[ERROR] Could not get courses.')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
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

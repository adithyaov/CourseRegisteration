<template>
  <div>
    <h2>Courses.</h2>
    <div class="main">
      <blockquote v-if="!user">
        <p>Please login to view your courses :-)</p>
      </blockquote>
      <div v-if="user">
        <form v-on:submit="createForm" class="create-form">
          <table class="form-table">
          <tr>
            <td><b>Name:</b></td>
            <td><input name="name" id="name" type="text" placeholder="eg. Machine Learning" /></td>
          </tr>
          <tr>
            <td><b>Code:</b></td>
            <td><input name="code" id="code" type="text" placeholder="eg. CS5534" /></td>
          </tr>
          <tr>
            <td><b>Credits:</b></td>
            <td><input name="credits" id="credits" type="text" placeholder="eg. 4" /></td>
          </tr>
          <tr>
            <td><b>Contact:</b></td>
            <td><input name="contact" id="contact" type="text" placeholder="eg. ml@iitpkd.ac.in" /></td>
          </tr>
          <tr>
            <td><b>Instructor:</b></td>
            <td><input name="instructor" id="instructor" type="text" placeholder="eg. Dr Sahely" /></td>
          </tr>
          <tr>
            <td><b>Target:</b></td>
            <td><textarea placeholder="seperated by commas. eg. cs-2015, cs-2016"></textarea></td>
          </tr>
          <tr>
            <td><input type="submit" value="Create" /></td>
            <td></td>
          </tr>
          </table>
        </form>
        <card-component v-for="c in courses"
          v-bind:key="c.id"
          v-bind:id="c.id"
          v-bind:name="c.name"
          v-bind:code="c.code"
          v-bind:credits="c.credits"
          v-bind:instructor="c.instructor"
          v-bind:contact="c.contact"
          v-bind:target="c.target"
          v-bind:deleteFromList="deleteFromList.bind(null, c.id)"
        ></card-component>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './course/Card'
  const axios = require('axios')
  export default {
    props: ['user'],
    name: 'course-component',
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
      createForm: function (event) {
        event.preventDefault()
        alert('In create')
      },
      getCourses: async function () {
        try {
          alert('Getting Data in Courses')
          var res = await axios.get('/course/owned')
          var updateWith = res.data.courses.map((c) => {
            return {
              id: c.id,
              name: c.name,
              code: c.code,
              instructor: c.instructor,
              credits: c.credits,
              contact: c.contact,
              target: c.groupList.map(g => g.code)
            }
          })
          this.courses = updateWith
        } catch (e) {
          alert('Something wrong with the server.')
        }
      },
      deleteFromList: function (id) {
        alert('lol')
        alert('lol')
        this.courses = this.courses.filter((c) => c.id !== id)
      }
    }
  }
</script>

<style scoped>
  .main {
    margin-top: 30px;
  }
  .create-form {
    max-width: 500px;
  }
  .form-table tr, .form-table td, .form-table {
    border: 0;
  }
  .form-table tr td {
    margin: 0;
    padding: 3px;
  }
</style>

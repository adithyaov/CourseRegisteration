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
            <td><b>Target group codes:</b></td>
            <td><textarea id="groupCodes" placeholder="seperated by commas. eg. cs-2015, cs-2016"></textarea></td>
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
          v-bind:groupCodes="c.groupCodes"
          v-bind:deleteFromList="deleteFromList.bind(null, c.id)"
          v-bind:updateContent="updateContent"
        ></card-component>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './course/Card'
  import * as axios from 'axios'
  export default {
    props: ['user'],
    name: 'course-component',
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
            groupCodes: ['G1', 'G2', 'G3', 'G4']
          }
        ]
      }
    },
    components: {
      'card-component': Card
    },
    methods: {
      createForm: async function (event) {
        try {
          event.preventDefault()
          alert('In create')
          const createFrom = document.querySelector('.create-form')
          var postData = {
            name: createFrom.querySelector('#name').value,
            code: createFrom.querySelector('#code').value,
            credits: createFrom.querySelector('#credits').value,
            contact: createFrom.querySelector('#contact').value,
            instructor: createFrom.querySelector('#instructor').value,
            groupCodes: createFrom.querySelector('#groupCodes').value
          }
          var res = await axios.post('/course/create', postData)
          if (res.data.course) {
            createFrom.querySelector('#name').value = ''
            createFrom.querySelector('#code').value = ''
            createFrom.querySelector('#credits').value = ''
            createFrom.querySelector('#contact').value = ''
            createFrom.querySelector('#instructor').value = ''
            createFrom.querySelector('#groupCodes').value = ''
            this.courses.unshift({
              id: res.data.course.id,
              name: res.data.course.name,
              code: res.data.course.code,
              credits: res.data.course.credits,
              contact: res.data.course.contact,
              instructor: res.data.course.instructor,
              groupCodes: res.data.validGroupCodes
            })
          } else {
            alert('Course could not be created.')
          }
        } catch (e) {
          alert('Something wrong with the server.')
        }
      },
      getCourses: async function () {
        try {
          alert('Getting Data in Courses')
          var res = await axios.get('/course/owned')
          var dataCourses = res.data.courses.map((c) => {
            return {
              id: c.id,
              name: c.name,
              code: c.code,
              instructor: c.instructor,
              credits: c.credits,
              contact: c.contact,
              groupCodes: c.groupList.map(g => g.code)
            }
          })
          this.courses = dataCourses
        } catch (e) {
          alert('Something wrong with the server.')
        }
      },
      deleteFromList: function (id) {
        alert('in Delete')
        this.courses = this.courses.filter((c) => c.id !== id)
      },
      updateContent: function (id, name, instructor, credits, contact, groupCodes) {
        alert('in Update')
        this.courses = this.courses.map(c => {
          if (c.id === id) {
            return {
              id: c.id,
              name: name,
              code: c.code,
              instructor: instructor,
              credits: credits,
              contact: contact,
              groupCodes: groupCodes
            }
          } else {
            return c
          }
        })
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

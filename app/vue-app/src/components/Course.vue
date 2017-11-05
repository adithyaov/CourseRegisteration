<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Courses.</h1>
      <hr />
      <div class="content">
        <blockquote v-if="heavenProp.checkScore(heavenProp.user.type) <= 1">
          <p>Please login to view your courses :-)</p>
        </blockquote>
        <div v-if="heavenProp.checkScore(heavenProp.user.type) >= 2">
          <form v-on:submit="createForm" class="create-form">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" name="name" id="name" type="text" placeholder="eg. Force training">
              </div>
            </div>
            <div class="field">
              <label class="label">Code</label>
              <div class="control">
                <input class="input" name="code" id="code" type="text" placeholder="eg. force-class-53">
              </div>
            </div>
            <div class="field">
              <label class="label">Credits</label>
              <div class="control">
                <input class="input" name="credits" id="credits" type="text" placeholder="eg. 5">
              </div>
            </div>
            <div class="field">
              <label class="label">Contact</label>
              <div class="control">
                <input class="input" name="contact" id="contact" type="text" placeholder="eg. yoda@jedi.com">
              </div>
            </div>
            <div class="field">
              <label class="label">Instructor</label>
              <div class="control">
                <input class="input" name="instructor" id="instructor" type="text" placeholder="eg. Yoda">
              </div>
            </div>
            <div class="field">
              <label class="label">Groups</label>
              <div class="control">
                <textarea class="textarea" id="groupCodes" placeholder="seperated by commas. eg. jedi-batch-1, jedi-batch-2"></textarea>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="button is-primary" type="submit" value="Create" />
              </div>
            </div>

          </form>

          <br />

          <blockquote v-if="courses.length === 0">
            <p>You don't own any course yet! Use the form above to create a course.</p>
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
            v-bind:groupCodes="c.groupCodes"
            v-bind:deleteFromList="deleteFromList.bind(null, c.id)"
            v-bind:updateContent="updateContent"
          ></card-component>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Card from './course/Card'
  import * as axios from 'axios'
  export default {
    props: ['heavenProp'],
    name: 'course-component',
    beforeMount () {
      if (this.heavenProp.checkScore(this.heavenProp.user.type) >= 2) {
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
      createForm: async function (event) {
        try {
          this.heavenProp.setLoaderState(true)
          event.preventDefault()
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
            alert('[ERROR] Course could not be created.')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      getCourses: async function () {
        try {
          this.heavenProp.setLoaderState(true)
          var res = await axios.get('/course/owned')
          if (res.data.courses) {
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
          } else {
            alert('[ERROR] Could not get courses.')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      deleteFromList: function (id) {
        this.courses = this.courses.filter((c) => c.id !== id)
      },
      updateContent: function (id, name, instructor, credits, contact, groupCodes) {
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
  .create-form {
    max-width: 500px;
  }
</style>

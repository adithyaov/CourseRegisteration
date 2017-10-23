<template>
  <div>
    <h2>Groups.</h2>
    <div class="main">
      <blockquote v-if="!user">
        <p>Please login to view your groups :-)</p>
      </blockquote>
      <div v-if="user">
        <form v-on:submit="createForm" class="create-form">
          <table class="form-table">
          <tr>
            <td><b>Name:</b></td>
            <td><input name="name" id="name" type="text" placeholder="eg. CS batch 2015" /></td>
          </tr>
          <tr>
            <td><b>Code:</b></td>
            <td><input name="code" id="code" type="text" placeholder="eg. cs-2015" /></td>
          </tr>
          <tr>
            <td><b>Contact:</b></td>
            <td><input name="contact" id="contact" type="text" placeholder="eg. cs-class-rep@smail.iitpkd.ac.in" /></td>
          </tr>
          <tr>
            <td><b>Users:</b></td>
            <td><textarea id="userEmails" placeholder="email's seperated by commas. eg. john@s.com, cole@b.com"></textarea></td>
          </tr>
          <tr>
            <td><input type="submit" value="Create" /></td>
            <td></td>
          </tr>
          </table>
        </form>
        <card-component v-for="g in groups"
          v-bind:key="g.id"
          v-bind:id="g.id"
          v-bind:name="g.name"
          v-bind:code="g.code"
          v-bind:contact="g.contact"
          v-bind:userEmails="g.userEmails"
          v-bind:deleteFromList="deleteFromList.bind(null, g.id)"
          v-bind:updateContent="updateContent"
        ></card-component>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from './group/Card'
  import * as axios from 'axios'
  export default {
    props: ['user'],
    name: 'course-component',
    beforeMount () {
      this.getCourses()
    },
    data () {
      return {
        groups: [
          {
            id: 3,
            name: 'Test',
            code: 'CS6654',
            contact: 'sahely@ml.com',
            userEmails: ['G1', 'G2', 'G3', 'G4']
          }
        ]
      }
    },
    components: {
      'card-component': Card
    },
    methods: {
      createForm: async function (event) {
        alert('In create')
      },
      getCourses: async function () {
        try {
          alert('Getting Data in Groups')
          var res = await axios.get('/group/owned')
          var dataGroups = res.data.groups.map((g) => {
            return {
              id: g.id,
              name: g.name,
              code: g.code,
              contact: g.contact,
              userEmails: g.userList.map(u => u.email)
            }
          })
          this.groups = dataGroups
        } catch (e) {
          alert('Something wrong with the server.')
        }
      },
      deleteFromList: function (id) {
        alert('in Delete')
        this.groups = this.groups.filter((c) => c.id !== id)
      },
      updateContent: function (id, name, contact, userEmails) {
        alert('in Update')
        this.groups = this.groups.map(g => {
          if (g.id === id) {
            return {
              id: g.id,
              name: name,
              code: g.code,
              contact: contact,
              userEmails: userEmails
            }
          } else {
            return g
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

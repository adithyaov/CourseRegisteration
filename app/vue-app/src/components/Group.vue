<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Groups.</h1>
      <hr />
      <div class="content">
        <blockquote v-if="heavenProp.checkScore(heavenProp.user.type) <= 1">
          <p>Please login to view your groups :-)</p>
        </blockquote>
        <div v-if="heavenProp.checkScore(heavenProp.user.type) >= 2">
          <form v-on:submit="createForm" class="create-form">
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" name="name" id="name" type="text" placeholder="eg. Jedi batch 1">
              </div>
            </div>
            <div class="field">
              <label class="label">Code</label>
              <div class="control">
                <input class="input" name="code" id="code" type="text" placeholder="eg. jedi-batch-1">
              </div>
            </div>
            <div class="field">
              <label class="label">Contact</label>
              <div class="control">
                <input class="input" name="contact" id="contact" type="text" placeholder="eg. batch1@jedi.com">
              </div>
            </div>
            <div class="field">
              <label class="label">Users</label>
              <div class="control">
                <textarea class="textarea" id="userEmails" placeholder="email's seperated by commas. eg. luke@jedi.com, rey@jedi.com"></textarea>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="button is-primary" type="submit" value="Create" />
              </div>
            </div>
            <br />
          </form>
          <blockquote v-if="groups.length === 0">
            <p>You don't own any group yet! Use the form above to create a group.</p>
          </blockquote>
          <card-component v-if="groups.length > 0" v-for="g in groups"
            v-bind:heavenProp="heavenProp"
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
  </section>
</template>

<script>
  import Card from './group/Card'
  import * as axios from 'axios'
  export default {
    props: ['heavenProp'],
    name: 'group-component',
    beforeMount () {
      if (this.heavenProp.checkScore(this.heavenProp.user.type) >= 2) {
        this.getGroups()
      } else {
        this.$router.push('/')
      }
    },
    data () {
      return {
        groups: []
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
            contact: createFrom.querySelector('#contact').value,
            userEmails: createFrom.querySelector('#userEmails').value
          }
          var res = await axios.post('/group/create', postData)
          if (res.data.group) {
            createFrom.querySelector('#name').value = ''
            createFrom.querySelector('#code').value = ''
            createFrom.querySelector('#contact').value = ''
            createFrom.querySelector('#userEmails').value = ''
            this.groups.unshift({
              id: res.data.group.id,
              name: res.data.group.name,
              code: res.data.group.code,
              contact: res.data.group.contact,
              userEmails: res.data.validUserEmails
            })
          } else {
            alert('[ERROR] Group could not be created.')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      getGroups: async function () {
        try {
          this.heavenProp.setLoaderState(true)
          var res = await axios.get('/group/owned')
          if (res.data.groups) {
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
          } else {
            alert('[ERROR] Could not get groups')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      deleteFromList: function (id) {
        this.groups = this.groups.filter((c) => c.id !== id)
      },
      updateContent: function (id, name, contact, userEmails) {
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
  .create-form {
    max-width: 500px;
  }
</style>

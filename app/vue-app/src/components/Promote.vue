<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Owners.</h1>
      <hr />
      <div class="content">
        <blockquote v-if="heavenProp.checkScore(heavenProp.user.type) <= 1">
          <p>Please login :-)</p>
        </blockquote>
        <div v-if="heavenProp.checkScore(heavenProp.user.type) >= 3">
          <form v-on:submit="addOwner" class="post-form">
            <div class="field">
              <label class="label">Add an owner</label>
              <div class="control">
                <input class="input" name="email" id="email" type="text" placeholder="eg. aniken@jedi.com">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="button is-primary" type="submit" value="Make Owner" />
              </div>
            </div>
          </form>
          <br />
          <blockquote v-if="owners.length === 0">
            <p>There are no owners yet.</p>
          </blockquote>
          <table v-if="owners.length > 0" class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="o in owners">
                <td>{{o.name}}</td>
                <td>{{o.email}}</td>
                <td><a v-on:click="removeOwner(o.email)">Remove</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import * as axios from 'axios'
  export default {
    props: ['heavenProp'],
    name: 'promote-component',
    beforeMount () {
      if (this.heavenProp.checkScore(this.heavenProp.user.type) >= 3) {
        this.getOwners()
      } else {
        this.$router.push('/')
      }
    },
    data () {
      return {
        owners: []
      }
    },
    methods: {
      addOwner: async function (event) {
        try {
          this.heavenProp.setLoaderState(true)
          event.preventDefault()
          const form = document.querySelector('.post-form')
          var postData = {
            email: form.querySelector('#email').value,
            type: 'owner'
          }
          var res = await axios.post('/user/updateType', postData)
          if (res.data.changedType) {
            form.querySelector('#email').value = ''
            this.owners.unshift({
              id: res.data.user.id,
              name: res.data.user.name,
              email: res.data.user.email,
              type: res.data.user.type
            })
          } else {
            alert('[ERROR] Promotion unsuccessful.')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      getOwners: async function () {
        try {
          this.heavenProp.setLoaderState(true)
          var res = await axios.get('/user/getTypes/owner')
          if (res.data.typeUsers) {
            var dataOwners = res.data.typeUsers.map((x) => {
              return {
                id: x.id,
                name: x.name,
                email: x.email
              }
            })
            this.owners = dataOwners
          } else {
            alert('[ERROR] Could not get owners')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      removeOwner: async function (email) {
        try {
          this.heavenProp.setLoaderState(true)
          var postData = {
            email: email,
            type: 'user'
          }
          var res = await axios.post('/user/updateType', postData)
          if (res.data.changedType) {
            this.owners = this.owners.filter((x) => {
              return x.email !== email
            })
          } else {
            alert('[ERROR] Demotion unsuccessful.')
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
  .post-form {
    max-width: 500px;
  }
</style>

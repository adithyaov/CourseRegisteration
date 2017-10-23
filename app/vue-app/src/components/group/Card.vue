<template>
  <div class="card">
    <h5 class="code">{{code}}</h5>
    <div v-if="mode == 'view'">
      <div><b>Name:</b> {{name}}</div>
      <div><b>Contact:</b> {{contact}}</div>
      <div><b>Users:</b> {{userEmails.join(', ')}}</div>
      <div class="options">
        <a v-on:click="changeMode">Edit</a>
        <a v-on:click="deleteCurrent">Delete</a>
      </div>
    </div>
    <div v-if="mode == 'edit'">
      <form v-on:submit="updateForm" class="update-form">
        <div><b>Name:</b> <br /> <input id="name" name="name" type="text" :value="name" /></div>
        <div><b>Contact:</b> <br /> <input id="contact" name="contact" type="text" :value="contact" /></div>
        <div><b>Users:</b> <br /> <textarea id="userEmails" name="userEmails">{{userEmails.join(', ')}}</textarea></div>
        <div><input type="submit" value="Update" /></div>
      </form>
      <div class="options">
        <a v-on:click="changeModeToView">Close</a>
      </div>
    </div>
  </div>
</template>

<script>
  import * as axios from 'axios'
  export default {
    props: ['id', 'name', 'code', 'contact', 'userEmails', 'deleteFromList', 'updateContent'],
    name: 'group-card-component',
    data () {
      return {
        mode: 'view'
      }
    },
    methods: {
      changeModeToView: function (event) {
        this.mode = 'view'
      },
      changeMode: function (event) {
        this.mode = 'edit'
      },
      updateForm: async function (event) {
        try {
          event.preventDefault()
          alert('In submission')
          const updateFrom = document.querySelector('.update-form')
          var postData = {
            name: updateFrom.querySelector('#name').value,
            contact: updateFrom.querySelector('#contact').value,
            userEmails: updateFrom.querySelector('#userEmails').value
          }
          alert(JSON.stringify(postData))
          var res = await axios.post('/group/update/' + this.id, postData)
          alert(JSON.stringify(res))
          if (res.data.updated) {
            this.updateContent(this.id,
              postData.name, postData.contact,
              res.data.validUserEmails)
            this.mode = 'view'
          } else {
            throw Error('Update was not possible.')
          }
        } catch (e) {
          alert('Update was not possible.')
        }
      },
      deleteCurrent: async function () {
        try {
          alert('In deleting')
          var res = await axios.post('/group/delete/' + this.id, null)
          if (res.data.deleted) {
            this.deleteFromList()
          } else {
            throw Error('Delete was not possible.')
          }
        } catch (e) {
          alert('Delete was not possible.')
        }
      }
    }
  }
</script>

<style scoped>
  .code {
    margin: 0;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .options {
    position: absolute;
    top: 12px;
    right: 0;
  }
  .options a {
    margin-right: 20px;
  }
  .card {
    position: relative;
    border: 0;
    border-left: 4px solid #c0c0c0;
    padding: 10px;
    margin-top: 30px;
    background-color: #fff;
  }
  .card:hover {
    border-left: 4px solid #a0a0a0;
  }
</style>

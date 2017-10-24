<template>
  <div class="card">
    <h5 class="code">{{code}}</h5>
    <div v-if="mode == 'view'">
      <div><b>Name:</b> {{name}}</div>
      <div><b>Credits:</b> {{credits}}</div>
      <div><b>Contact:</b> {{contact}}</div>
      <div><b>Instructor:</b> {{instructor}}</div>
      <div><b>Target:</b> {{groupCodes.join(', ')}}</div>
      <div class="options">
        <a v-on:click="changeMode">Edit</a>
        <a v-on:click="deleteCurrent">Delete</a>
      </div>
    </div>
    <div v-if="mode == 'edit'">
      <form v-on:submit="updateForm" class="update-form">
        <div><b>Name:</b> <br /> <input id="name" name="name" type="text" :value="name" /></div>
        <div><b>Credits:</b> <br /> <input id="credits" name="credits" type="text" :value="credits" /></div>
        <div><b>Contact:</b> <br /> <input id="contact" name="contact" type="text" :value="contact" /></div>
        <div><b>Instructor:</b> <br /> <input id="instructor" name="instructor" type="text" :value="instructor" /></div>
        <div><b>Target:</b> <br /> <textarea id="groupCodes" name="groupCodes">{{groupCodes.join(', ')}}</textarea></div>
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
    props: ['id', 'name', 'code', 'credits', 'contact', 'instructor', 'groupCodes', 'deleteFromList', 'updateContent', 'heavenProp'],
    name: 'course-card-component',
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
          this.heavenProp.setLoaderState(true)
          event.preventDefault()
          const updateFrom = document.querySelector('.update-form')
          var postData = {
            name: updateFrom.querySelector('#name').value,
            credits: updateFrom.querySelector('#credits').value,
            contact: updateFrom.querySelector('#contact').value,
            instructor: updateFrom.querySelector('#instructor').value,
            groupCodes: updateFrom.querySelector('#groupCodes').value
          }
          var res = await axios.post('/course/update/' + this.id, postData)
          if (res.data.updated) {
            this.updateContent(this.id,
              postData.name, postData.instructor,
              postData.credits, postData.contact,
              res.data.validGroupCodes)
            this.mode = 'view'
          } else {
            alert('[ERROR] Update was not possible.')
          }
          this.heavenProp.setLoaderState(false)
        } catch (e) {
          alert('[DEBUG] ' + e)
          this.heavenProp.setLoaderState(false)
        }
      },
      deleteCurrent: async function () {
        try {
          this.heavenProp.setLoaderState(true)
          var res = await axios.post('/course/delete/' + this.id, null)
          if (res.data.deleted) {
            this.deleteFromList()
          } else {
            alert('[ERROR] Delete was not possible.')
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

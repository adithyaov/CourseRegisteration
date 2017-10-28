<template>
  <!-- <div class="card">
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
  </div> -->
  <div class="card modified-card">
    <header class="card-header">
      <div class="card-header-title">
        {{code}}
      </div>
      <div v-if="mode == 'view'" class="card-header-icon">
        <a v-on:click="changeMode">Edit</a>
        <a v-on:click="deleteCurrent">Delete</a>
      </div>
      <div v-if="mode == 'edit'" class="card-header-icon">
        <a v-on:click="changeModeToView">Close</a>
      </div>
    </header>
    <div class="card-content">
      <div v-if="mode == 'view'" class="content">
        <div><b>Name:</b> {{name}}</div>
        <div><b>Credits:</b> {{credits}}</div>
        <div><b>Contact:</b> {{contact}}</div>
        <div><b>Instructor:</b> {{instructor}}</div>
        <div><b>Groups:</b> {{groupCodes.join(', ')}}</div>
      </div>
      <div v-if="mode == 'edit'" class="content">
        <form v-on:submit="updateForm" class="update-form">
          <div class="field">
            <div class="control">
              <input :value="name" class="input" name="name" id="name" type="text" placeholder="Name">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input :value="credits" class="input" name="credits" id="credits" type="text" placeholder="Credits">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input :value="contact" class="input" name="contact" id="contact" type="text" placeholder="Contact">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input :value="instructor" class="input" name="instructor" id="instructor" type="text" placeholder="Instructor">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea class="textarea" id="groupCodes" name="groupCodes" placeholder="Groups">{{groupCodes.join(', ')}}</textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="button is-link" type="submit" value="Update" />
            </div>
          </div>
        </form>
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
.modified-card {
  border-left: 2px solid #c0c0c0;
  margin-bottom: 10px;
}
.modified-card .card-header-icon a {
  margin-left: 12px;
}
</style>

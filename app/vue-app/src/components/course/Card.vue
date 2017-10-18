<template>
  <div class="card">
    <h5 class="code">{{code}}</h5>
    <div v-if="mode == 'view'">
      <div><b>Name:</b> {{name}}</div>
      <div><b>Credits:</b> {{credits}}</div>
      <div><b>Contact:</b> {{contact}}</div>
      <div><b>Instructor:</b> {{instructor}}</div>
      <div><b>Target:</b> {{target.join(', ')}}</div>
      <div class="options">
        <a v-on:click="changeMode">Edit</a>
        <a v-on:click="deleteCurrent">Delete</a>
      </div>
    </div>
    <div v-if="mode == 'edit'">
      <form v-on:submit="updateForm">
        <div><b>Name:</b> <br /> <input name="name" type="text" :value="name" /></div>
        <div><b>Credits:</b> <br /> <input name="credits" type="text" :value="credits" /></div>
        <div><b>Contact:</b> <br /> <input name="contact" type="text" :value="contact" /></div>
        <div><b>Instructor:</b> <br /> <input name="instructor" type="text" :value="instructor" /></div>
        <div><b>Target:</b> <br /> <textarea name="instructor">{{target.join(', ')}}</textarea></div>
        <div><input type="submit" value="Update" /></div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['id', 'name', 'code', 'credits', 'contact', 'instructor', 'target', 'deleteFromList'],
    name: 'course-card-component',
    data () {
      return {
        mode: 'view'
      }
    },
    methods: {
      changeMode: function (event) {
        this.mode = 'edit'
      },
      updateForm: function (event) {
        event.preventDefault()
        alert('In submission')
        this.mode = 'view'
      },
      deleteCurrent: function () {
        alert('In deleting')
        this.deleteFromList()
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

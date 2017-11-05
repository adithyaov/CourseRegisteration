<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Bulk Post.</h1>
      <hr />
      <div class="content">
        <blockquote v-if="heavenProp.checkScore(heavenProp.user.type) <= 1">
          <p>Please login :-)</p>
        </blockquote>
        <div v-if="heavenProp.checkScore(heavenProp.user.type) >= 2">
          <article class="message">
            <div class="message-header">
              <p>Specification</p>
            </div>
            <div class="message-body">
              <b>Groups </b>
              <br />
              `name`, `code`, `contact`
              <br />
              Example :- <br /> Jedi Group 1, jedi-group1, group1@jedi.com
              <hr />
              <b>Users </b>
              <br />
              `name`, `email`, `groups [`group`]`
              <br />
              Example :- <br /> Luke Skywalker, luke@jedi.com, [jedi-group1, jedi-group2]
              <hr />
              <b>Courses </b>
              <br />
              `name`, `code`, `credits`, `contact`, `instructor`, `groups [`group`]`
              <br />
              Example :- <br /> Force Training 101, ft-101, 4, yoda@academy.com, Master Yoda, [jedi-group1, jedi-group2]
            </div>
          </article>
          <form v-on:submit="postForm" class="post-form">
            <div class="field">
              <label class="label">Post To</label>
              <div class="control">
                <div class="select">
                  <select name="post-to" id="post-to">
                    <option value="groups">Groups</option>
                    <option value="users">Users</option>
                    <option value="courses">Courses</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Data</label>
              <div class="control">
                <textarea class="textarea" id="post-data" placeholder="Please paste the data here, 100 entries per batch."></textarea>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <input class="button is-primary" type="submit" value="Post" />
              </div>
            </div>

          </form>
          <br />


          <article v-if="faulier.length > 0" class="message is-warning">
            <div class="message-header">
              <p>Failed queries</p>
            </div>
            <div class="message-body">
              <div v-for="x in faulier">
                {{x}}
              </div>
            </div>
          </article>

          <article v-if="success.length > 0" class="message is-success">
            <div class="message-header">
              <p>Successful queries</p>
            </div>
            <div class="message-body">
              <div v-for="x in success">
                {{x}}
              </div>
            </div>
          </article>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import * as axios from 'axios'
  export default {
    props: ['heavenProp'],
    name: 'bulk-component',
    data () {
      return {
        success: [],
        faulier: []
      }
    },
    methods: {
      postForm: async function (e) {
        this.heavenProp.setLoaderState(true)
        e.preventDefault()
        this.success = []
        this.faulier = []
        const postForm = document.querySelector('.post-form')
        var postTo = postForm.querySelector('#post-to').value
        var postData = postForm.querySelector('#post-data').value
        var pattern = new RegExp(/^(.+),\s*?\[(.+)\]$/)
        var lines = postData.split('\n')
        // iter variables
        var matchPattern, name, email, code, credits, contact, instructor, groupCodes, data, res, line, groupCodesString
        if (postTo === 'users') {
          for (line of lines) {
            try {
              matchPattern = line.trim().match(pattern)
              if (matchPattern[0].length > 0) {
                [name, email] = matchPattern[1].split(',').map(x => x.trim())
                groupCodes = matchPattern[2].split(',').map(x => x.trim())
                data = {
                  name: name,
                  email: email,
                  groupCodes: groupCodes
                }
                res = await axios.post('/user/create', data)
                if (res.data.status) {
                  this.success.push(matchPattern[0])
                } else {
                  this.faulier.push(matchPattern[0])
                }
              }
            } catch (e) {
              if (line.length > 0) {
                this.faulier.push(line)
              }
            }
          }
        }
        if (postTo === 'groups') {
          for (line of lines) {
            try {
              if (line.length > 0) {
                [name, code, contact] = line.split(',').map(x => x.trim())
                data = {
                  name: name,
                  code: code,
                  contact: contact,
                  userEmails: ''
                }
                res = await axios.post('/group/create', data)
                if (res.data.group) {
                  this.success.push(line)
                } else {
                  this.faulier.push(line)
                }
              }
            } catch (e) {
              if (line.length > 0) {
                this.faulier.push(line)
              }
            }
          }
        }
        if (postTo === 'courses') {
          for (line of lines) {
            try {
              matchPattern = line.trim().match(pattern)
              if (matchPattern[0].length > 0) {
                [name, code, credits, contact, instructor] = matchPattern[1].split(',').map(x => x.trim())
                groupCodesString = matchPattern[2].trim()
                data = {
                  name: name,
                  code: code,
                  credits: credits,
                  contact: contact,
                  instructor: instructor,
                  groupCodes: groupCodesString
                }
                res = await axios.post('/course/create', data)
                if (res.data.course) {
                  this.success.push(matchPattern[0])
                } else {
                  this.faulier.push(matchPattern[0])
                }
              }
            } catch (e) {
              if (line.length > 0) {
                this.faulier.push(line)
              }
            }
          }
        }
        this.heavenProp.setLoaderState(false)
      }
    }
  }
</script>

<style scoped>
.submit-form .textarea {
  min-height: 200px;
}
</style>

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

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  // import * as axios from 'axios'
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
        alert(0)
      },
      getOwners: async function () {
        alert(1)
      },
      removeOwner: function (id) {
        alert(2)
      }
    }
  }
</script>

<style scoped>
  .create-form {
    max-width: 500px;
  }
</style>

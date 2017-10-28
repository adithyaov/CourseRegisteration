<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">
          <h1 class="title" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1">Hi {{heavenProp.user.name}}</h1>
          <h1 class="title" v-else="heavenProp.checkScore(heavenProp.user.type) >= 1">Hi Anomymous</h1>
        </h1>
        <h2 class="subtitle">
          <p v-if="heavenProp.checkScore(heavenProp.user.type >= 1)">
            Welcome to course registeration, IIT Palakkad.
          </p>
          <p v-else="heavenProp.checkScore(heavenProp.user.type >= 1)">
            Sign In to get started.
          </p>
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['heavenProp'],
    name: 'hello-component'
  }
</script>

<style scoped>
  blockquote span {
    text-decoration: underline;
  }
</style>

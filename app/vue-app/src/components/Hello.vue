<template>
  <div>
    <h2 v-if="heavenProp.checkScore(heavenProp.user.type) >= 1">Hi {{heavenProp.user.name}},</h2>
    <h2 v-else="heavenProp.checkScore(heavenProp.user.type) >= 1">Hi :-),</h2>
    <div class="main">
      <b>What is this website for?</b>
      <blockquote>
        <p>This website is a temporary replacement for students to select their courses</p>
      </blockquote>
      <b>Bugs?</b>
      <blockquote>
        <p>Please report bugs/issues at <span>contact.imakov.iitpkd@gmail.com</span></p>
        <p>Make sure the title of the mail is "[BUG] [your-title-here]"</p>
      </blockquote>
      <b>Help?</b>
      <blockquote>
        <p>Please ask for help at <span>contact.imakov.iitpkd@gmail.com</span></p>
        <p>Make sure the title of the mail is "[HELP] [your-title-here]"</p>
      </blockquote>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['heavenProp'],
    name: 'hello-component'
  }
</script>

<style scoped>
  .main {
    margin-top: 30px;
  }
  blockquote span {
    text-decoration: underline;
  }
</style>

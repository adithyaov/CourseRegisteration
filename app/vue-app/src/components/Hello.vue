<template>
  <section>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            <h1 class="title" v-if="heavenProp.checkScore(heavenProp.user.type) >= 1">Hi {{heavenProp.user.name}}</h1>
            <h1 class="title" v-else="heavenProp.checkScore(heavenProp.user.type) >= 1">Hi Anomymous</h1>
          </h1>
          <h2 class="subtitle">
            <p v-if="heavenProp.checkScore(heavenProp.user.type) >= 1">
              Welcome to course registeration, IIT Palakkad.
            </p>
            <p v-else="heavenProp.checkScore(heavenProp.user.type) >= 1">
              Sign In to get started.
            </p>
          </h2>
        </div>
      </div>
    </section>
    <section>
      <div class="container" style="margin-top:30px; margin-bottom:30px;">
        <article class="message">
          <div class="message-header">
            <p>What is this website for?</p>
          </div>
          <div class="message-body">
            The purpous of this website is to be a convinient alternative for students to register for courses.
          </div>
        </article>
        <article class="message">
          <div class="message-header">
            <p>Quick Links</p>
          </div>
          <div class="message-body">
            IIT Palakkad Website :- <a href="http://turing.iitpkd.ac.in/web/">http://turing.iitpkd.ac.in/web/</a>
            <br />
            IIT Palakkad Contact :- <a href="http://turing.iitpkd.ac.in/web/index.php/contact-us/">http://turing.iitpkd.ac.in/web/index.php/contact-us/</a>
            <br />
            Telephone Directory :- <a href="http://turing.iitpkd.ac.in/web/wp-content/uploads/2017/06/Directory.pdf">http://turing.iitpkd.ac.in/web/wp-content/uploads/2017/06/Directory.pdf</a>
            <br />
            Moodle :- <a href="http://turing.iitpkd.ac.in/moodle/">http://turing.iitpkd.ac.in/moodle/</a>
            <br />
            Time Table :- <a href="http://turing.iitpkd.ac.in/web/index.php/timetbl/">http://turing.iitpkd.ac.in/web/index.php/timetbl/</a>
          </div>
        </article>
      </div>
    </section>
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

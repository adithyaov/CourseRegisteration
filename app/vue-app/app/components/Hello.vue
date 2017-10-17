<template>
  <div>
    <h2>My Courses.</h2>
    <div class="hello">
      <blockquote v-if="!user">
        <p>Please login to view your courses :-)</p>
      </blockquote>
      <div v-if="user">
        <card-component
          v-bind:id="3"
          v-bind:name="'Test'"
          v-bind:code="'CS6645'"
          v-bind:credits="5"
          v-bind:instructor="'Sahely'"
          v-bind:contact="'sahely@ml.com'"
        ></card-component>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from 'components/hello/Card';
  export default {
    props: ['user'],
    name: 'hello-component',
    components: {
      'card-component': Card
    }
  }
</script>

<style scoped>
  .hello {
    margin-top: 30px;
  }
</style>

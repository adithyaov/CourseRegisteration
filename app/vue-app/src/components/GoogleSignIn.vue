<template>
  <a ref="signinBtn" class="bd-tw-button button is-primary">
    <span class="icon">
      <i class="fa fa-google"></i>
    </span>
    <span>
      Sign In
    </span>
  </a>
</template>

<script>
  export default {
    name: 'g-signin-button',
    mounted () {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '578466896799-k9k6ugjrb3rncqsg8jbfcpeoar8bgndl.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        })
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
          this.$emit('done', googleUser)
        }, error => console.log(error))
      })
    }
  }
</script>

<style scoped>

</style>

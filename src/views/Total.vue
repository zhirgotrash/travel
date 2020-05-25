<template>
  <div class="total">
    <h1>Request Reservation</h1>
      <label for=""><input type="text">Your name</label>
      <label for=""><input type="text">Your email</label>
      <label for=""><input type="text">Phone number</label>
      <label for=""><input type="text">Your tour</label>
    <div class="">Estimated price: {{RESULT}}</div>
    <button>Get a personal offer</button>
    <div class="">By ckicking on this button, I agree to the <a href="">Terms of Service</a> and the <a href="">Privay Policy</a></div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'Total',
  data () {
    return {
      result: this.RESULT
    }
  },
  mounted () {
    this.SET_SEASONS();
  },
  computed: {
    ...mapGetters(['RESULT'])
  },
  methods: {
    ...mapActions(['SET_SEASONS'])
  }
}

</script>
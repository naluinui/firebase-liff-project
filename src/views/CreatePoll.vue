<template>
  <section>
    <div class="container">
      <h1 class="title">Create Pizzanulok Poll</h1>
      <b-field label="Name">
          <b-input v-model="name"></b-input>
      </b-field>
      <b-button @click="cancel">Cancel</b-button>
      <b-button type="is-primary" @click="start">Start</b-button>
    </div>
  </section>
</template>

<script>

export default {
  beforeCreate() {
    // TODO: initial LIFF
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    cancel() {
      this.$buefy.notification.open('Clicked!!')
      // TODO: close LIFF window
    },
    start() {
      // TODO: create poll in Firebase
        // TODO: send message to chat room once finish creating poll
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Create Pizzanulok Poll</h1>
      <b-field label="Name">
          <b-input v-model="name" placeholder="Poll name"></b-input>
      </b-field>
      <div class="buttons is-centered">
        <b-button @click="cancel">Cancel</b-button>
        <b-button type="is-primary" @click="start" :class="{ 'is-loading': isCreating }">Start</b-button>
      </div>
    </div>
  </section>
</template>

<script>
const firebase  = require('../firebase.js')
export default {
  beforeCreate() {
    // TODO: initial LIFF
  },
  data () {
    return {
      name: null,
      isCreating: false
    }
  },
  methods: {
    cancel() {
      this.$buefy.notification.open('Clicked!!')
      // TODO: close LIFF window
    },
    start() {
      const app = this
      if (!app.name) { 
        app.toast('Please set the poll name', false)
        return
      }
      app.isCreating = true
      firebase.pizzasCollection.get().then(snapshot => {
        const options = snapshot.docs.map ((doc, index) => { 
          const pizza = doc.data()
          return {
            'value': index,
            'text': pizza.name, 
            'votes': 0
          }
        })
        firebase.pollsCollection.add({
          'name': app.name,
          'options': options
        })
        .then(function(docRef) {
          console.log(docRef)
          app.isCreating = false
          app.toast('Poll created!', true)
          // TODO: send message to chat room once finish creating poll
          // TODO: or share to friend with share picker
        })
        .catch(function(error) {
          app.isCreating = false
          app.toast('Oops! Something went wrong!', false)
          console.error(error)
        })
      });
    },
    toast(message, isSuccess) {
        this.$buefy.toast.open({
          message: message,
          position: 'is-bottom',
          type: isSuccess ? 'is-success' : 'is-danger'
        })
    }
  }
}
</script>

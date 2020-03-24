<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Create Pizzanulok Poll</h1>
      <b-field label="Name">
          <b-input v-model="name"></b-input>
      </b-field>
      <b-button @click="cancel">Cancel</b-button>
      <b-button type="is-primary" @click="start" :class="{ 'is-loading': isCreating }">Start</b-button>
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
      name: 'Test',
      isCreating: false
    }
  },
  methods: {
    cancel() {
      this.$buefy.notification.open('Clicked!!')
      // TODO: close LIFF window
    },
    start() {
      const main = this
      main.isCreating = true
      // if (name === '') { main.toast('Please set the poll name', false) }
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
          'name': name,
          'options': options
        })
        .then(function(docRef) {
          console.log(docRef)
          main.isCreating = false
          main.toast('Poll created!', true)
          // TODO: send message to chat room once finish creating poll
          // TODO: or share to friend with share picker
        })
        .catch(function(error) {
          main.isCreating = false
          main.toast('Oops! Something went wrong!', false)
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

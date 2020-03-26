<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <!-- loading indicator -->
        <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
        <!-- pizza -->
        <div class="column is-half" v-for="pizza in pizzas" v-bind:key="pizza.id">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img v-bind:src="`${pizza.url}`" v-bind:alt="`${pizza.name}`">
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <p class="title is-2">
                  {{ pizza.name }}
                </p>
                <p class="subtitle">
                  ฿ {{ pizza.price }}
                </p>
                <p class="subtitle is-6">ส่วนประกอบ: {{ pizza.ingredients.toString() }}</p>
              </div>
              <b-button type="is-primary is-fullwidth">สั่งเลย</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const firebaseApp = require('../firebase.js')
export default {
  data() {
    return {
      pizzas: [{
        name: 'Hawaiian',
        price: 300,
        url: 'https://storage.googleapis.com/devfest-181020.appspot.com/pizzas/hawaiian.jpg',
        ingredients: ['Ham', 'Pineapple', 'Bacon']
      }],
      isLoading: false
    }
  },
  mounted() {
    // TODO: get pizza from Firestore
    this.isLoading = true
    firebaseApp.pizzasCollection.get().then(snapshot => {
      this.isLoading = false
      this.pizzas = snapshot.docs.map ( doc => (
        {id: doc.id, ...doc.data()}
      ))
    });
  },
  methods: {
    
  }
}
</script>
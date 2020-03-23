<template>
  <section class="section">
    <div class="container columns is-multiline">
      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
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
  </section>
</template>

<script>
const firebase  = require('../firebase.js')
export default {
  data() {
    return {
      pizzas: [],
      isLoading: true
    }
  },
  mounted() {
    const main = this
    firebase.pizzasCollection.get().then(snapshot => {
      main.isLoading = false
      main.pizzas = snapshot.docs.map ( doc => (
        {id: doc.id, ...doc.data()}
      ))
    });
  }
}
</script>
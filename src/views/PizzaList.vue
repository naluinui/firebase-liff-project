<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Pizzanulok menu</h1>
      <!-- greeting text -->
      <h3 class="subtitle" v-if="userProfile">สวัสดีคุณ {{ userProfile.displayName }} ทานอะไรดีคะ 😀</h3>
      <h3 class="subtitle" v-else>สวัสดีค่ะ ทานอะไรดีคะ 😀</h3>
      <!-- pizza list -->
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
              <b-button type="is-primary is-fullwidth" @click="order(pizza)">สั่งเลย</b-button>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO: 4 add share button-->
    </div>
  </section>
</template>

<script>
// TODO: 1.1 import FirebaseApp from Helper file
export default {
  data() {
    return {
      pizzas: [{
        name: 'Hawaiian',
        price: 300,
        url: 'https://storage.googleapis.com/devfest-181020.appspot.com/pizzas/hawaiian.jpg',
        ingredients: ['Ham', 'Pineapple', 'Bacon']
      }],
      isLoading: false,
      userProfile: null
    }
  },
  mounted() {
    // TODO: 2 initial LIFF
    // TODO: 1.2 get pizza from Firestore
  },
  methods: {
    order(pizza) {
      console.log(pizza.name)
      // TODO: 3 send message to the chat
    }, share() {
      // TODO: 5 implement share menu action
    }
  }
}
</script>

<style scoped>
  .share {
    margin: 8px auto;
    padding: 16px;
  }
</style>
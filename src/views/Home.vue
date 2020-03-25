<template>
  <section class="section">
    <div class="container">
      <h1 class="title"> {{ greetingText }} </h1>
      <b-field>
          <b-input v-model="name" placeholder="Tell us your name"></b-input>
      </b-field>
      <b-button type="is-primary" @click="enter">Enter</b-button>
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      name: null,
      greetingText: "Hello! What's your name?"
    }
  },
  methods: {
    // TODO: 1. Say hello!
    enter () {
      if (!this.name) return
      this.greetingText = "Hello, " + this.name + "!"
    }
  },
  watch: {
    // TODO: 2. see reactive data
    name () {
      if (!this.name) return
      this.greetingText = "Hello, " + this.name + "!"
    }
  }
}
</script>

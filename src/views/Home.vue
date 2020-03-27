<template>
  <section class="section">
    <div class="container">
      <h1 class="title"> {{ greetingText }} </h1>
      <!-- TODO: 9. loop names -->
      <b-field>
          <!-- TODO: 2. ใช้ placeholder ที่สร้างไว้ใน TODO: 1. มา v-bind ลง parameter placeholder -->
          <b-input v-model="name" placeholder="Tell us your name"></b-input>
      </b-field>
      <!-- TODO: 5. ใส่ button เพิ่มเพิ่อ set เงื่อนไข v-if v-else -->
      <b-button type="is-primary" @click="enter">Enter</b-button>
      <!-- TODO: 10. add button -->
    </div>
  </section>
</template>

<script>

export default {
  data () {
    return {
      // TODO: 1. เพิ่มตัวแปร placeholder
      name: null,
      greetingText: "Hello! What's your name?",
      // TODO: 7. เพิ่มตัวแปร names ที่เป็น array ของ name
    }
  },
  methods: {
    // TODO: 3. Say hello! โดยการนำชื่อที่ผู้ใช้กรอกมารวมใน greetingText
    enter () {
      if (!this.name) return
      // TODO: 6. reset name เมื่อ enter
    },
    // TODO: 8. เพิ่ม function add()
  },
  // TODO: 4. see reactive data on watch
}
</script>

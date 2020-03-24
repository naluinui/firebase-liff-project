<template>
  <section class="section">
    <div class="container">
        <h1>{{selectors.count}} Person{{selectors.count > 1 ? 's' : ''}} voted for "{{option.text}}"</h1>
    </div>
  </section>
</template>

<script> 
  const firebase = require('../firebase.js')

  export default {  
      data() {
        return {
            pollId: this.$route.params.pollId,
            optionValue: this.$route.params.optionValue,
            option: null,
            selectors: []
        }
      },
      mounted() {
        const main = this
        firebase.pollsCollection.doc(main.pollId).onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.data())}`);
            const poll = docSnapshot.data()
            const index = poll.options.findIndex(option => option.value === main.optionValue)
            if (index >= 0) {
                main.option = poll.options[index]
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
      },
      methods: {
      }
  }
</script>
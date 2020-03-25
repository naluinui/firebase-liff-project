<template>
  <section class="section">
    <div class="container">
        <h1 v-if="option">{{voters.length}} Person{{voters.length > 1 ? 's' : ''}} voted for "{{option.text}}"</h1>
        <div v-for="voter in voters" :key="voter.userId" class="voter">
          <img :src="voter.pictureUrl" width="80" height="80">
          <p>{{voter.displayName}}</p>
        </div>
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
            voters: []
        }
      },
      mounted() {
        const main = this
        firebase.pollsCollection.doc(main.pollId).onSnapshot(docSnapshot => {
            console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.data())}`);
            const poll = docSnapshot.data()
            const index = poll.options.findIndex(option => option.value === main.optionValue)
            if (index >= 0) {
                let option = poll.options[index]
                main.option = option
                main.voters = poll.voters.filter(voter => voter.option === main.optionValue)
            }
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
      },
      methods: {
      }
  }
</script>

<style scoped>
  .voter {
    text-align: center;
    border: 2px solid #77C7F7;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer; 
    padding: 5px 0; 
    margin: 8px 0;
    transition: background .2s ease-in-out;
    -webkit-transition: background .2s ease-in-out;
    -moz-transition: background .2s ease-in-out;
  }
</style>
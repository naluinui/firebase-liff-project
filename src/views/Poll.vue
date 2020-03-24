<template>
  <section class="section">
    <div class="container">
      <!-- TODO: consider to move out the library or find another library that can see people who is already voted -->
      <button class="button is-fullwidth" v-for="option in opts" v-bind:key="option.value" @click="voteFor(option)" :disabled="isVoted">{{option.text}}</button>
      <vue-poll v-bind="options" @addvote="addVote"/>
    </div>
  </section>
</template>

<script> 
  import VuePoll from 'vue-poll'
  const firebase  = require('../firebase.js')

  export default {  
      data() {
        return {
          pollId: this.$route.params.pollId,
          options: {
            question: '',
            answers: [],
            finalResults: false
          },
          opts: [],
          isVoted: false
        }
      },
      components: {
        VuePoll
      },
      mounted() {
        const main = this
        firebase.pollsCollection.doc(this.pollId).onSnapshot(docSnapshot => {
          console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.data())}`);
          const poll = docSnapshot.data()
          main.options = {
            question: poll.name,
            answers: poll.options,
            finalResults: false
          }
          main.opts = poll.options
        }, err => {
          console.log(`Encountered error: ${err}`);
        });
      },
      methods: {
        voteFor(option) {
          console.log(option.text)
          this.isVoted = false
        },
        addVote(obj) {
          // const options = this.options.map(option => option.value === obj.value ? { ...option, value })
          // options
          const options = this.options.answers
          console.log('before del:' + JSON.stringify(options))
          options.forEach (option => {
            delete option.selected
            delete option.percent
          })
          console.log('after del:' + JSON.stringify(options))
          firebase.pollsCollection.doc('4T71FaYF9k1QQrrEKQGj').update({
            options: options
          });
          console.log('You voted ' + obj.value + '!');
        }
      }
  }
</script>
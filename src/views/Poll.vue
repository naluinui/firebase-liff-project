<template>
  <section class="section">
    <div class="container">
      <h1 v-if="poll">{{poll.name}}</h1>
      <!-- TODO: consider to move out the library or find another library that can see people who is already voted -->
      <div v-if="isVoted">
        <button class="button is-fullwidth" v-for="option in options" v-bind:key="option.value" @click="showVoters(option)">{{option.text}} ({{option.votes}})</button>
      </div>
      <div v-else>
        <button class="button is-fullwidth" v-for="option in options" v-bind:key="option.value" @click="voteFor(option)">{{option.text}}</button>
      </div>
      <!-- <vue-poll v-bind="options" @addvote="addVote"/> -->
    </div>
  </section>
</template>

<script> 
  // import VuePoll from 'vue-poll'
  import firebase from 'firebase'
  const firebaseApp = require('../firebase.js')

  export default {  
      data() {
        return {
          pollId: this.$route.params.pollId,
          poll: null,
          // options: {
          //   question: '',
          //   answers: [],
          //   finalResults: false
          // },
          options: [],
          voters: [],
          isVoted: false,
          user: {
            name: "Tukta",
            image: "https://image.flaticon.com/icons/svg/219/219961.svg"
          }
        }
      },
      // components: {
      //   VuePoll
      // },
      mounted() {
        const main = this
        firebaseApp.pollsCollection.doc(main.pollId).onSnapshot(docSnapshot => {
          console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.data())}`)
          const poll = docSnapshot.data()
          main.poll = poll
          // main.options = {
          //   question: poll.name,
          //   answers: poll.options,
          //   finalResults: false
          // }
          main.options = poll.options
          main.voters = poll.voters
          main.isVoted = poll.voters.filter(voter => voter.name === main.user.name).length > 0
        }, err => {
          console.log(`Encountered error: ${err}`)
        })
      },
      methods: {
        voteFor(selectedOption) {
          console.log(selectedOption.text)
          const index = this.options.findIndex(option => option.value === selectedOption.value)
          if (index >= 0) {
            this.options[index].votes += 1
            const voter = {
              name: this.user.name,
              image: this.user.image,
              option: this.options[index].value
            }
            this.voters.push(voter)
            this.isVoted = true
            firebaseApp.pollsCollection.doc(this.pollId).update({
              options: this.options,
              voters: firebase.firestore.FieldValue.arrayUnion(voter)
            })
          }
        },
        showVoters(selectedOption) {
          console.log(selectedOption.text)
          this.$router.push({ name: 'OptionVoters', params: { pollId: this.pollId, optionValue: selectedOption.value } })
        }
        // addVote(obj) {
        //   // const options = this.options.map(option => option.value === obj.value ? { ...option, value })
        //   // options
        //   const options = this.options.answers
        //   console.log('before del:' + JSON.stringify(options))
        //   options.forEach (option => {
        //     delete option.selected
        //     delete option.percent
        //   })
        //   console.log('after del:' + JSON.stringify(options))
        //   firebase.pollsCollection.doc('4T71FaYF9k1QQrrEKQGj').update({
        //     options: options
        //   });
        //   console.log('You voted ' + obj.value + '!');
        // }
      }
  }
</script>
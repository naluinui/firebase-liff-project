<template>
  <section class="section">
    <div class="container">
      <h1 v-if="poll">{{poll.name}}</h1>
      <div v-if="isVoted">
        <button v-for="option in options" v-bind:key="option.value" 
                :class="selectedOption === option.value ? 'button is-fullwidth vote-option selected' : 'button is-fullwidth vote-option'" 
                @click="showVoters(option)">{{option.text}} ({{option.votes}})</button>
      </div>
      <div v-else>  
        <button v-for="option in options" v-bind:key="option.value" 
                class="button is-fullwidth vote-option"
                @click="addVote(option)">{{option.text}}</button>
      </div>
    </div>
  </section>
</template>

<script> 
  import firebase from 'firebase'
  const firebaseApp = require('../firebase.js')

  export default {  
    data() {
      return {
        pollId: this.$route.params.pollId,
        poll: null,
        options: [],
        voters: [],
        isVoted: false,
        selectedOption: 0,
        user: {
          name: "Pop",
          image: "https://image.flaticon.com/icons/svg/219/219966.svg"
        }
      }
    },
    mounted() {
      firebaseApp.pollsCollection.doc(this.pollId).onSnapshot(docSnapshot => {
        console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.data())}`)
        const poll = docSnapshot.data()
        this.poll = poll
        this.options = poll.options
        this.isVoted = poll.voters.filter(voter => voter.name === this.user.name).length > 0
      }, err => {
        console.log(`Encountered error: ${err}`)
      })
    },
    methods: {
      addVote(option) {
        console.log('You voted ' + option.text + '!');
        this.selectedOption = option.value
        const index = this.options.findIndex(option => option.value === this.selectedOption)
        if (index >= 0) {
          this.options[index].votes += 1
          const voter = {
            name: this.user.name,
            image: this.user.image,
            option: this.selectedOption
          }
          firebaseApp.pollsCollection.doc(this.pollId).update({
            options: this.options,
            voters: firebase.firestore.FieldValue.arrayUnion(voter)
          })
          this.isVoted = true
        }
      },
      showVoters(option) {
        console.log(option.text)
        this.$router.push({ name: 'OptionVoters', params: { pollId: this.pollId, optionValue: option.value } })
      }
    }
  }
</script>

<style scoped>
  .vote-option {
    margin: 10px 0;
  }
  .vote-option.selected {
    border-color: blue;
  }
</style>
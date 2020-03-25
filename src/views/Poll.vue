<template>
  <section class="section">
    <div class="container">
      <!-- TODO: consider to move out the library or find another library that can see people who is already voted -->
      <vue-poll v-bind="options" @addvote="addVote" @showVoters="showVoters"/>
    </div>
  </section>
</template>

<script> 
  import VuePoll from '../components/Poll'
  import firebase from 'firebase'
  const firebaseApp = require('../firebase.js')

  export default {  
      data() {
        return {
          pollId: this.$route.params.pollId,
          pollOptions: [],
          voters: [],
          options: {
            question: '',
            answers: [],
            finalResults: false
          },
          user: {
            name: "Tukta",
            image: "https://image.flaticon.com/icons/svg/219/219961.svg"
          }
        }
      },
      components: {
        VuePoll
      },
      mounted() {
        firebaseApp.pollsCollection.doc(this.pollId).onSnapshot(docSnapshot => {
          console.log(`Received doc snapshot: ${JSON.stringify(docSnapshot.data())}`)
          const poll = docSnapshot.data()
          this.options = {
            question: poll.name,
            answers: poll.options,
            finalResults: poll.voters.filter(voter => voter.name === this.user.name).length > 0
          }
          this.pollOptions = poll.options
        }, err => {
          console.log(`Encountered error: ${err}`)
        })
      },
      methods: {
        addVote(obj) {
          console.log('You voted ' + obj.value + '!');
          const selecetdValue = obj.value
          const index = this.pollOptions.findIndex(option => option.value === selecetdValue)
          if (index >= 0) {
            this.pollOptions[index].votes += 1
            const voter = {
              name: this.user.name,
              image: this.user.image,
              option: selecetdValue
            }
            firebaseApp.pollsCollection.doc(this.pollId).update({
              options: this.pollOptions,
              voters: firebase.firestore.FieldValue.arrayUnion(voter)
            })
            this.options.finalResults = true
          }
        },
        showVoters(obj) {
          console.log(obj.text)
          this.$router.push({ name: 'OptionVoters', params: { pollId: this.pollId, optionValue: obj.value } })
        }
      }
  }
</script>
import firebase from 'firebase/app'
import 'firebase/firestore'

// firebase initialize
const config  = require('./firebase-config')
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()

// firebase collections
const pizzasCollection = db.collection('pizzas')
const pollsCollection = db.collection('polls')

export {
    db,
    pizzasCollection,
    pollsCollection
}
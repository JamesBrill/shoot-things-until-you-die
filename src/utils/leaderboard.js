import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyBji9o7iyFajjN5FHavIXaL1NNoi2HqvP0',
  authDomain: 'shoot-things-until-you-die-1.firebaseapp.com',
  projectId: 'shoot-things-until-you-die-1'
})

const db = firebase.firestore()

export async function getAllScores () {
  const querySnapshot = await db.collection('scores').get()
  const scores = querySnapshot.docs.map(doc => doc.data())
  return scores.sort((a, b) => a.score - b.score)
}

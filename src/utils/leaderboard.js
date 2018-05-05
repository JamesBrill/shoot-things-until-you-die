import firebase from 'firebase'
import 'firebase/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyD9nw3EAy1TdH1OMrEH8I9BjuT_lMqner4',
  authDomain: 'shoot-things-until-you-die-2.firebaseapp.com',
  projectId: 'shoot-things-until-you-die-2'
})

const db = firebase.firestore()

export async function getAllScores () {
  const querySnapshot = await db.collection('scores').get()
  const scores = querySnapshot.docs.map(doc => {
    return { name: doc.id, ...doc.data() }
  })
  const sortedScores = scores.sort((a, b) => a.score - b.score)
  return sortedScores.map((x, i) => {
    return { ...x, rank: sortedScores.length - i }
  })
}

export async function getScoreForPlayer (name) {
  const scoreData = await db.collection('scores').doc(name).get()
  if (scoreData.exists) {
    return scoreData.data().score
  }
  return 0
}

export function submitScore (name, score) {
  db.collection('scores').doc(name).set({ score })
}

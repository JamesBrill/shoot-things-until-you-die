import ScoreDisplay from '../ui/ScoreDisplay'

export default class ScoreManager {
  constructor ({ game }) {
    this.score = 0
    this.scoreDisplay = new ScoreDisplay({ game, score: this.score })
    this.game = game
  }

  registerHit () {
    this.score += ScoreManager.HIT_VALUE
    this.scoreDisplay.setScore(this.score)
  }
}

ScoreManager.HIT_VALUE = 10

import ScoreDisplay from '../ui/ScoreDisplay'

export default class ScoreManager {
  constructor ({ game }) {
    this.score = 0
    this.multiplier = 1
    this.scoreDisplay = new ScoreDisplay({
      game,
      score: this.score,
      multiplier: this.multiplier
    })
    this.game = game
    this.decreaseMultiplierTimeout = null
  }

  decreaseMultiplier () {
    this.multiplier = Math.max(Number((this.multiplier - 0.1).toFixed(1)), 1)
    this.scoreDisplay.setScore(this.score, this.multiplier)
    if (this.multiplier > 1) {
      this.decreaseMultiplierTimeout = setTimeout(
        this.decreaseMultiplier.bind(this),
        ScoreManager.DECREASE_MULTIPLIER_TIMEOUT
      )
    }
  }

  registerHit () {
    this.score += ScoreManager.HIT_VALUE * this.multiplier
    this.scoreDisplay.setScore(this.score, this.multiplier)
  }

  registerKill () {
    this.score += ScoreManager.KILL_VALUE * this.multiplier
    this.multiplier = Number((this.multiplier + 0.1).toFixed(1))
    this.scoreDisplay.setScore(this.score, this.multiplier)
    if (this.decreaseMultiplierTimeout !== null) {
      clearTimeout(this.decreaseMultiplierTimeout)
    }
    this.decreaseMultiplierTimeout = setTimeout(
      this.decreaseMultiplier.bind(this),
      ScoreManager.DECREASE_MULTIPLIER_TIMEOUT
    )
  }
}

ScoreManager.HIT_VALUE = 10
ScoreManager.KILL_VALUE = 100
ScoreManager.DECREASE_MULTIPLIER_TIMEOUT = 750

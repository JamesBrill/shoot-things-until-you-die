import ScoreDisplay from '../ui/ScoreDisplay'
import { getAllScores } from '../utils/leaderboard'

export default class ScoreManager {
  constructor ({ game }) {
    this.init(game)
  }

  async init (game) {
    this.game = game
    this.decreaseMultiplierTimeout = null
    this.score = 0
    this.multiplier = 1
    this.scoreDisplay = new ScoreDisplay({
      game: this.game,
      score: this.score,
      multiplier: this.multiplier
    })
    this.scores = await getAllScores()
    this.nextScoreIndex = 0
    this.scoreDisplay.setNextBestScore(this.scores[this.nextScoreIndex])
  }

  increaseScore (value) {
    this.score += value * this.multiplier
    if (
      this.nextScoreIndex < this.scores.length &&
      this.score >= this.scores[this.nextScoreIndex].score
    ) {
      while (
        this.nextScoreIndex < this.scores.length &&
        this.score >= this.scores[this.nextScoreIndex].score
      ) {
        this.nextScoreIndex++
      }
      if (this.nextScoreIndex === this.scores.length) {
        this.scoreDisplay.setWorldRecord()
      } else {
        this.scoreDisplay.setNextBestScore(this.scores[this.nextScoreIndex])
      }
    }
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
    this.increaseScore(ScoreManager.HIT_VALUE)
    this.scoreDisplay.setScore(this.score, this.multiplier)
  }

  registerKill () {
    this.increaseScore(ScoreManager.KILL_VALUE)
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

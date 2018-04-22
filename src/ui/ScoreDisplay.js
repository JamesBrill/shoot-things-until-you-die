export default class ScoreDisplay {
  constructor ({ game, score, multiplier }) {
    this.game = game
    this.scoreText = this.game.add.text(0, 0, `${score} (x${multiplier})`, {
      font: '32px Arial',
      fill: 'black',
      boundsAlignH: 'center'
    })
    this.scoreText.fixedToCamera = true
    this.scoreText.bringToTop()
    this.scoreText.setTextBounds(0, 0, this.game.width, this.game.height)

    this.nextBestScoreText = this.game.add.text(0, 36, 'Loading scores...', {
      font: '16px Arial',
      fill: 'black',
      boundsAlignH: 'center'
    })
    this.nextBestScoreText.fixedToCamera = true
    this.nextBestScoreText.bringToTop()
    this.nextBestScoreText.setTextBounds(
      0,
      0,
      this.game.width,
      this.game.height
    )
  }

  setScore (score, multiplier) {
    this.scoreText.setText(`${score} (x${multiplier})`)
  }

  setNextBestScore ({ name, score }) {
    this.nextBestScoreText.setText(`Next: ${score} (${name})`)
  }

  setWorldRecord () {
    this.nextBestScoreText.setText('World Record!')
  }
}

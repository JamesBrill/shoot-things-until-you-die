export default class ScoreDisplay {
  constructor ({ game, score, multiplier }) {
    this.game = game
    this.scoreText = this.game.add.text(0, 0, `${score} (x${multiplier})`, {
      font: '32px Arial',
      fill: 'red',
      boundsAlignH: 'center'
    })
    this.scoreText.fixedToCamera = true
    this.scoreText.setTextBounds(0, 0, this.game.width, this.game.height)
  }

  setScore (score, multiplier) {
    this.scoreText.setText(`${score} (x${multiplier})`)
  }
}

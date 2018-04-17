export default class ScoreDisplay {
  constructor ({ game, score, multiplier }) {
    this.game = game
    this.scoreText = this.game.add.text(
      this.game.width / 2,
      8,
      `${score} (x${multiplier})`,
      {
        font: '32px Arial',
        fill: 'red',
        align: 'center',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      }
    )
    this.scoreText.fixedToCamera = true
    this.scoreText.cameraOffset.setTo(this.game.width / 2, 8)
  }

  setScore (score, multiplier) {
    this.scoreText.setText(`${score} (x${multiplier})`)
  }
}

export default class ScoreDisplay {
  constructor ({ game, score }) {
    this.game = game
    this.scoreText = this.game.add.text(this.game.width / 2, 8, score, {
      font: '32px Arial',
      fill: 'red',
      align: 'center',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    })
    this.scoreText.fixedToCamera = true
    this.scoreText.cameraOffset.setTo(this.game.width / 2, 8)
  }

  setScore (score) {
    this.scoreText.setText(score)
  }
}

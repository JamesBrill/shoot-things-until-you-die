export default class DeathDisplay {
  constructor ({ game }) {
    this.game = game
    this.fontSize = 100
  }

  expandText () {
    this.fontSize += 0.2
    this.deathText.fontSize = this.fontSize
    setTimeout(this.expandText.bind(this), 100)
  }

  showDeathScreen () {
    this.deathBar = this.game.add.graphics(0, 0)
    this.deathBar.fixedToCamera = true
    this.deathBar.beginFill('black')
    this.deathBar.drawRect(0, this.game.height / 2 - 50, this.game.width, 100)
    this.deathBar.endFill()

    this.deathText = this.game.add.text(0, 0, 'YOU DIED', {
      font: `${this.fontSize}px Arial`,
      fill: 'red',
      boundsAlignH: 'center',
      boundsAlignV: 'middle'
    })
    this.deathText.fixedToCamera = true
    this.deathText.bringToTop()
    this.deathText.setTextBounds(0, 0, this.game.width, this.game.height)
    setTimeout(this.expandText.bind(this), 100)
  }

  hideDeathScreen () {
    if (this.deathText) {
      this.fontSize = 128
      this.deathBar.destroy()
      this.deathText.destroy()
    }
  }
}

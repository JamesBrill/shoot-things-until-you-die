import Phaser from 'phaser'

export default class HealthBar extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    const healthBar = game.add.graphics(0, 0)
    healthBar.lineStyle(1, 0x000000)
    healthBar.lineTo(0, HealthBar.HEIGHT)
    healthBar.lineTo(HealthBar.WIDTH, HealthBar.HEIGHT)
    healthBar.lineTo(HealthBar.WIDTH, 0)
    healthBar.lineTo(0, 0)
    super(game, x, y, healthBar.generateTexture())
    this.game = game
    healthBar.destroy()
    this.setHealth(100)
  }

  setHealth (health) {
    let healthBarColour
    if (health > 66) {
      healthBarColour = 0x00ff00
    } else if (health > 33) {
      healthBarColour = 0xffff00
    } else {
      healthBarColour = 0xff0000
    }
    const healthContentsWidth = HealthBar.WIDTH * (health / 100)
    this.removeChild(this.healthBarContents)
    const healthBarContents = this.game.add.graphics(0, 0)
    healthBarContents.beginFill(healthBarColour)
    healthBarContents.lineTo(0, HealthBar.HEIGHT)
    healthBarContents.lineTo(healthContentsWidth, HealthBar.HEIGHT)
    healthBarContents.lineTo(healthContentsWidth, 0)
    healthBarContents.lineTo(0, 0)
    healthBarContents.endFill()
    this.healthBarContents = new Phaser.Sprite(
      this.game,
      1,
      1,
      healthBarContents.generateTexture()
    )
    this.addChild(this.healthBarContents)
    healthBarContents.destroy()
  }
}

HealthBar.WIDTH = 50
HealthBar.HEIGHT = 10

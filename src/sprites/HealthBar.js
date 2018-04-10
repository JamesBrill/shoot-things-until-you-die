import Phaser from 'phaser'

export default class HealthBar extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    const healthBar = game.add.graphics(0, 0)
    healthBar.lineStyle(1, 0x000000)
    healthBar.lineTo(0, 20)
    healthBar.lineTo(HealthBar.WIDTH, 20)
    healthBar.lineTo(HealthBar.WIDTH, 0)
    healthBar.lineTo(0, 0)
    super(game, x, y, healthBar.generateTexture())
    this.game = game
    healthBar.destroy()
    this.setHealth(100)
  }

  setHealth (health) {
    this.removeChild(this.healthBarContents)
    const healthBarContents = this.game.add.graphics(0, 0)
    healthBarContents.beginFill(0x00ff00)
    healthBarContents.lineTo(0, 20)
    healthBarContents.lineTo(health, 20)
    healthBarContents.lineTo(health, 0)
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

HealthBar.WIDTH = 100

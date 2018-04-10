import Phaser from 'phaser'

export default class HealthBar extends Phaser.Sprite {
  constructor ({ game, x, y, maxHealth }) {
    const healthBar = game.add.graphics(0, 0)
    healthBar.lineStyle(1, 0x000000)
    healthBar.lineTo(0, HealthBar.HEIGHT)
    healthBar.lineTo(HealthBar.WIDTH, HealthBar.HEIGHT)
    healthBar.lineTo(HealthBar.WIDTH, 0)
    healthBar.lineTo(0, 0)
    super(game, x, y, healthBar.generateTexture())
    this.game = game
    this.maxHealth = maxHealth || 100
    healthBar.destroy()
    this.setHealth(this.maxHealth)
  }

  getHealthBarColour (health) {
    if (health > 2 / 3 * this.maxHealth) {
      return 0x00ff00
    } else if (health > 1 / 3 * this.maxHealth) {
      return 0xffff00
    } else {
      return 0xff0000
    }
  }

  setHealth (health) {
    const healthBarColour = this.getHealthBarColour(health)
    const healthContentsWidth = HealthBar.WIDTH * (health / this.maxHealth)
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

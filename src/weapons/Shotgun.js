import Phaser from 'phaser'

export default class Shotgun extends Phaser.Weapon {
  constructor ({ game, player }) {
    super(game, game.plugins)

    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0xff0000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, Shotgun.BULLET_LENGTH)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(Shotgun.NUMBER_OF_BULLETS, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = Shotgun.GUN_RANGE - Shotgun.BULLET_LENGTH
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * Shotgun.GUN_ANGLE
    this.bulletSpeed = 1500
    this.fireRate = 0
    this.trackSprite(player, 0, 0)

    this.loadingShell = false
  }

  loadNewShell () {
    this.loadingShell = false
  }

  fire () {
    if (!this.loadingShell) {
      this.loadingShell = true
      for (let i = 0; i < 12; i++) {
        super.fire()
      }
      setTimeout(this.loadNewShell.bind(this), Shotgun.FIRE_RATE)
    }
  }
}

Shotgun.GUN_RANGE = 250
Shotgun.GUN_ANGLE = 30
Shotgun.BULLET_LENGTH = 10
Shotgun.NUMBER_OF_BULLETS = 12
Shotgun.FIRE_RATE = 600

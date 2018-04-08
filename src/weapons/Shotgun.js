import Phaser from 'phaser'

export default class extends Phaser.Weapon {
  constructor ({ game, player }) {
    super(game, game.plugins)
    const GUN_RANGE = 250
    const GUN_ANGLE = 30
    const BULLET_LENGTH = 10
    const NUMBER_OF_BULLETS = 12

    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0xff0000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, BULLET_LENGTH)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(NUMBER_OF_BULLETS, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = GUN_RANGE - BULLET_LENGTH
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * GUN_ANGLE
    this.bulletSpeed = 1500
    this.fireRate = 0
    this.trackSprite(player, 0, 0)
  }
}

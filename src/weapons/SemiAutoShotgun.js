import Phaser from 'phaser'
import FiringCone from '../sprites/FiringCone'

export default class SemiAutoShotgun extends Phaser.Weapon {
  constructor ({ game }) {
    super(game, game.plugins)

    this.fireSound = game.add.audio('semi_auto_shotgun_fire')

    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0xff0000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, SemiAutoShotgun.BULLET_LENGTH)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(SemiAutoShotgun.NUMBER_OF_BULLETS, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance =
      SemiAutoShotgun.GUN_RANGE - SemiAutoShotgun.BULLET_LENGTH
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * SemiAutoShotgun.GUN_ANGLE
    this.bulletSpeed = 1500
    this.fireRate = 0

    this.firingCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange: SemiAutoShotgun.GUN_RANGE,
      gunAngle: SemiAutoShotgun.GUN_ANGLE
    })

    this.loadingShell = false
  }

  arm (player) {
    this.trackSprite(player, 0, 0)
  }

  disarm () {
    this.trackSprite(null)
  }

  loadNewShell () {
    this.loadingShell = false
  }

  fire () {
    if (!this.loadingShell) {
      this.loadingShell = true
      this.fireSound.play()
      for (let i = 0; i < 12; i++) {
        super.fire()
      }
      setTimeout(this.loadNewShell.bind(this), SemiAutoShotgun.FIRE_RATE)
    }
  }

  aimAt (x, y) {
    const fireAngle = this.firingCone.updateFireAngle(x, y)
    this.fireAngle = fireAngle
  }
}

SemiAutoShotgun.GUN_RANGE = 200
SemiAutoShotgun.GUN_ANGLE = 45
SemiAutoShotgun.BULLET_LENGTH = 10
SemiAutoShotgun.NUMBER_OF_BULLETS = 12
SemiAutoShotgun.FIRE_RATE = 300

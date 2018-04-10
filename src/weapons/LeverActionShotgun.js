import Phaser from 'phaser'
import FiringCone from '../sprites/FiringCone'

export default class LeverActionShotgun extends Phaser.Weapon {
  constructor ({ game }) {
    super(game, game.plugins)

    this.fireSound = game.add.audio('lever_action_shotgun_fire')

    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0xff0000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, LeverActionShotgun.BULLET_LENGTH)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(LeverActionShotgun.NUMBER_OF_BULLETS, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance =
      LeverActionShotgun.GUN_RANGE - LeverActionShotgun.BULLET_LENGTH
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * LeverActionShotgun.GUN_ANGLE
    this.bulletSpeed = LeverActionShotgun.BULLET_SPEED
    this.fireRate = 0
    this.attackDamage = LeverActionShotgun.ATTACK_DAMAGE

    this.firingCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange: LeverActionShotgun.GUN_RANGE,
      gunAngle: LeverActionShotgun.GUN_ANGLE
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
      setTimeout(this.loadNewShell.bind(this), LeverActionShotgun.FIRE_RATE)
    }
  }

  aimAt (x, y) {
    const fireAngle = this.firingCone.updateFireAngle(x, y)
    this.fireAngle = fireAngle
  }

  hitTarget () {
    // Lever action shotgun bullets cut through everything
  }
}

LeverActionShotgun.GUN_RANGE = 350
LeverActionShotgun.GUN_ANGLE = 20
LeverActionShotgun.BULLET_LENGTH = 20
LeverActionShotgun.NUMBER_OF_BULLETS = 6
LeverActionShotgun.FIRE_RATE = 1250
LeverActionShotgun.BULLET_SPEED = 3000
LeverActionShotgun.ATTACK_DAMAGE = 100

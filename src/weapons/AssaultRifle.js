import Phaser from 'phaser'
import FiringCone from '../sprites/FiringCone'

export default class AssaultRifle extends Phaser.Weapon {
  constructor ({ game }) {
    super(game, game.plugins)

    this.fireSound = game.add.audio('assault_rifle_fire')

    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0xff0000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, AssaultRifle.BULLET_LENGTH)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(AssaultRifle.NUMBER_OF_BULLETS, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance =
      AssaultRifle.GUN_RANGE - AssaultRifle.BULLET_LENGTH
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * AssaultRifle.GUN_ANGLE
    this.bulletSpeed = AssaultRifle.BULLET_SPEED
    this.fireRate = 0
    this.attackDamage = AssaultRifle.ATTACK_DAMAGE

    this.firingCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange: AssaultRifle.GUN_RANGE,
      gunAngle: AssaultRifle.GUN_ANGLE
    })

    this.loadingBullet = false
  }

  arm (player) {
    this.trackSprite(player, 0, 0)
  }

  disarm () {
    this.trackSprite(null)
  }

  loadNewBullet () {
    this.loadingBullet = false
  }

  fire () {
    if (!this.loadingBullet) {
      this.loadingBullet = true
      this.fireSound.play()
      super.fire()
      setTimeout(this.loadNewBullet.bind(this), AssaultRifle.FIRE_RATE)
    }
  }

  aimAt (x, y) {
    const fireAngle = this.firingCone.updateFireAngle(x, y)
    this.fireAngle = fireAngle
  }

  hitTarget (bullet) {
    bullet.kill()
  }
}

AssaultRifle.GUN_RANGE = 700
AssaultRifle.GUN_ANGLE = 5
AssaultRifle.BULLET_LENGTH = 20
AssaultRifle.NUMBER_OF_BULLETS = 30
AssaultRifle.FIRE_RATE = 100
AssaultRifle.BULLET_SPEED = 3000
AssaultRifle.ATTACK_DAMAGE = 34

import Phaser from 'phaser'

export default class ZombieBossGun extends Phaser.Weapon {
  constructor ({ game }) {
    super(game, game.plugins)

    this.game = game

    if (!ZombieBossGun.FIRE_SOUND) {
      this.fireSound = game.add.audio('lever_action_shotgun_fire')
      ZombieBossGun.FIRE_SOUND = this.fireSound
    } else {
      this.fireSound = ZombieBossGun.FIRE_SOUND
    }

    this.attackDamage = ZombieBossGun.ATTACK_DAMAGE
    this.gunRange = ZombieBossGun.GUN_RANGE

    this.createBullets(10, 'enemy_bullet')
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = ZombieBossGun.GUN_RANGE
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * ZombieBossGun.GUN_ANGLE
    this.bulletSpeed = ZombieBossGun.BULLET_SPEED
    this.fireRate = 0
    this.loadingBullet = false
  }

  arm (zombie) {
    this.trackSprite(zombie, 0, 0)
    this.zombie = zombie
  }

  disarm () {
    this.trackSprite(null)
  }

  fire () {
    if (!this.loadingBullet) {
      this.loadingBullet = true
      this.fireSound.play()
      for (let i = 0; i < 3; i++) {
        const bullet = super.fire()
        if (bullet) {
          bullet.angle += Math.random() * 180
        }
      }
      setTimeout(this.loadNewBullet.bind(this), ZombieBossGun.FIRE_RATE)
    }
  }

  loadNewBullet () {
    this.loadingBullet = false
  }

  aimAt (x, y) {
    const fireAngle = this.updateFireAngle(x, y)
    this.fireAngle = fireAngle
  }

  updateFireAngle (x, y) {
    const { angleBetween, radToDeg } = this.game.math
    const aimAngle = angleBetween(this.zombie.x, this.zombie.y, x, y)
    return radToDeg(aimAngle)
  }

  hitTarget (bullet) {
    bullet.kill()
  }
}

ZombieBossGun.GUN_RANGE = 1000
ZombieBossGun.GUN_ANGLE = 30
ZombieBossGun.FIRE_RATE = 200
ZombieBossGun.BULLET_SPEED = 500
ZombieBossGun.ATTACK_DAMAGE = 10
ZombieBossGun.FIRE_SOUND = null

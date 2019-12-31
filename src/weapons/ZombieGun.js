import Phaser from 'phaser'

export default class ZombieGun extends Phaser.Weapon {
  constructor ({ game }) {
    super(game, game.plugins)

    this.game = game

    if (!ZombieGun.FIRE_SOUND) {
      this.fireSound = game.add.audio('pistol_fire')
      ZombieGun.FIRE_SOUND = this.fireSound
    } else {
      this.fireSound = ZombieGun.FIRE_SOUND
    }

    this.attackDamage = ZombieGun.ATTACK_DAMAGE
    this.gunRange = ZombieGun.GUN_RANGE

    this.createBullets(10, 'enemy_bullet')
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = ZombieGun.GUN_RANGE
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * ZombieGun.GUN_ANGLE
    this.bulletSpeed = ZombieGun.BULLET_SPEED
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
      const bullet = super.fire()
      if (bullet) {
        bullet.angle += Math.random() * 180
      }
      setTimeout(this.loadNewBullet.bind(this), ZombieGun.FIRE_RATE)
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

ZombieGun.GUN_RANGE = 500
ZombieGun.GUN_ANGLE = 15
ZombieGun.FIRE_RATE = 750
ZombieGun.BULLET_SPEED = 200
ZombieGun.ATTACK_DAMAGE = 10
ZombieGun.FIRE_SOUND = null

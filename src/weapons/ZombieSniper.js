import Phaser from 'phaser'

export default class ZombieSniper extends Phaser.Weapon {
  constructor ({ game }) {
    super(game, game.plugins)

    this.game = game

    if (!ZombieSniper.FIRE_SOUND) {
      this.fireSound = game.add.audio('semi_auto_shotgun_fire')
      ZombieSniper.FIRE_SOUND = this.fireSound
    } else {
      this.fireSound = ZombieSniper.FIRE_SOUND
    }

    this.attackDamage = ZombieSniper.ATTACK_DAMAGE
    this.gunRange = ZombieSniper.GUN_RANGE

    this.createBullets(10, 'enemy_bullet')
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = ZombieSniper.GUN_RANGE
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * ZombieSniper.GUN_ANGLE
    this.bulletSpeed = ZombieSniper.BULLET_SPEED
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
      setTimeout(this.loadNewBullet.bind(this), ZombieSniper.FIRE_RATE)
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

ZombieSniper.GUN_RANGE = 5000
ZombieSniper.GUN_ANGLE = 1
ZombieSniper.FIRE_RATE = 2000
ZombieSniper.BULLET_SPEED = 300
ZombieSniper.ATTACK_DAMAGE = 50
ZombieSniper.FIRE_SOUND = null

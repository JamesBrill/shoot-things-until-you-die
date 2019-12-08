import Phaser from 'phaser'

export default class ZombieGun extends Phaser.Weapon {
  constructor ({ game, zombie }) {
    super(game, game.plugins)

    this.game = game
    this.zombie = zombie

    if (!ZombieGun.FIRE_SOUND) {
      this.fireSound = game.add.audio('pistol_fire')
      ZombieGun.FIRE_SOUND = this.fireSound
    } else {
      this.fireSound = ZombieGun.FIRE_SOUND
    }

    this.attackDamage = ZombieGun.ATTACK_DAMAGE
    this.gunRange = ZombieGun.GUN_RANGE

    let bulletTexture
    if (!ZombieGun.BULLET_TEXTURE) {
      const bulletGraphics = game.add.graphics(0, 0)
      bulletGraphics.lineStyle(5, 0x000000)
      bulletGraphics.moveTo(0, 0)
      bulletGraphics.lineTo(0, ZombieGun.BULLET_LENGTH)
      bulletGraphics.endFill()
      bulletTexture = bulletGraphics.generateTexture()
      ZombieGun.BULLET_TEXTURE = bulletTexture
      bulletGraphics.destroy()
    } else {
      bulletTexture = ZombieGun.BULLET_TEXTURE
    }

    this.createBullets(10, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = ZombieGun.GUN_RANGE - ZombieGun.BULLET_LENGTH
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
      super.fire()
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
ZombieGun.FIRE_RATE = 1000
ZombieGun.BULLET_LENGTH = 30
ZombieGun.BULLET_SPEED = 200
ZombieGun.ATTACK_DAMAGE = 10
ZombieGun.BULLET_TEXTURE = null
ZombieGun.FIRE_SOUND = null

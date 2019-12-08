import Phaser from 'phaser'

export default class ZombieGun extends Phaser.Weapon {
  constructor ({ game, zombie }) {
    super(game, game.plugins)

    this.game = game
    this.zombie = zombie
    this.fireSound = game.add.audio('pistol_fire') // TODO: dedupe
    this.attackDamage = ZombieGun.ATTACK_DAMAGE
    this.gunRange = ZombieGun.GUN_RANGE

    // TODO: dedupe
    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0x000000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, ZombieGun.BULLET_LENGTH)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(10, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = ZombieGun.GUN_RANGE - ZombieGun.BULLET_LENGTH
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * ZombieGun.GUN_ANGLE
    this.bulletSpeed = ZombieGun.BULLET_SPEED
    this.fireRate = 0
  }

  arm (zombie) {
    this.trackSprite(zombie, 0, 0)
  }

  disarm () {
    this.trackSprite(null)
  }

  fire () {
    this.fireSound.play()
    super.fire()
  }

  aimAt (x, y) {
    const fireAngle = this.updateFireAngle(x, y)
    this.fireAngle = fireAngle
  }

  updateFireAngle (x, y) {
    const { angleBetween, radToDeg } = this.game.math
    const aimAngle = angleBetween(this.x, this.y, x, y)
    return radToDeg(aimAngle)
  }

  hitTarget (bullet) {
    bullet.kill()
  }
}

ZombieGun.GUN_RANGE = 300
ZombieGun.GUN_ANGLE = 15
ZombieGun.BULLET_LENGTH = 30
ZombieGun.BULLET_SPEED = 1000
ZombieGun.ATTACK_DAMAGE = 10

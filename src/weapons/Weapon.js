import Phaser from 'phaser'
import FiringCone from '../sprites/FiringCone'
import WeaponDisplay from '../ui/WeaponDisplay'

export default class Weapon extends Phaser.Weapon {
  constructor ({
    game,
    fireSound,
    bulletLength,
    numberOfBullets,
    gunRange,
    gunAngle,
    bulletSpeed,
    attackDamage,
    reloadTime,
    fireRate,
    maxBullets,
    ammoReserves,
    displayName,
    displayY
  }) {
    super(game, game.plugins)

    this.dryFireSound = game.add.audio('dry_fire')
    this.canPlayDryFireSound = true

    this.game = game
    this.fireSound = fireSound
    this.bulletLength = bulletLength
    this.numberOfBullets = numberOfBullets
    this.gunRange = gunRange
    this.gunAngle = gunAngle
    this.bulletSpeed = bulletSpeed
    this.attackDamage = attackDamage
    this.reloadTime = reloadTime
    this.actualFireRate = fireRate
    this.maxBullets = maxBullets
    this.ammoReserves = ammoReserves

    const bulletGraphics = game.add.graphics(0, 0)
    bulletGraphics.lineStyle(3, 0xff0000)
    bulletGraphics.moveTo(0, 0)
    bulletGraphics.lineTo(0, bulletLength)
    bulletGraphics.endFill()
    const bulletTexture = bulletGraphics.generateTexture()
    bulletGraphics.destroy()

    this.createBullets(numberOfBullets, bulletTexture)
    this.bulletKillType = Phaser.Weapon.KILL_DISTANCE
    this.bulletKillDistance = gunRange - bulletLength
    this.bulletAngleOffset = 90
    this.bulletAngleVariance = 0.5 * gunAngle
    this.bulletSpeed = bulletSpeed
    this.fireRate = 0
    this.currentAmmo = this.maxBullets
    this.weaponDisplay = new WeaponDisplay({
      game,
      x: 0,
      y: displayY,
      displayName,
      currentAmmo: this.currentAmmo,
      ammoReserves: ammoReserves
    })

    this.firingCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange,
      gunAngle
    })
  }

  arm (player) {
    this.trackSprite(player, 0, 0)
  }

  disarm () {
    this.trackSprite(null)
  }

  fire () {
    super.fire()
  }

  aimAt (x, y) {
    const fireAngle = this.firingCone.updateFireAngle(x, y)
    this.fireAngle = fireAngle
  }

  hitTarget (bullet) {
    bullet.kill()
  }

  playDryFireSound () {
    if (this.canPlayDryFireSound) {
      this.dryFireSound.play()
      this.canPlayDryFireSound = false
      const enableDryFireSound = () => {
        this.canPlayDryFireSound = true
      }
      setTimeout(enableDryFireSound, 1000)
    }
  }
}

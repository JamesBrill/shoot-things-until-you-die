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
    displayY,
    bulletColour,
    firingConeColour,
    weaponDisplay
  }) {
    super(game, game.plugins)

    this.dryFireSound = game.add.audio('dry_fire')
    this.canPlayDryFireSound = true

    this.game = game
    this.fireSound = fireSound
    this.fireSound.allowMultiple = true
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
    bulletGraphics.lineStyle(3, bulletColour || 0x000000)
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
    this.weaponDisplay = weaponDisplay || new WeaponDisplay({
      game,
      x: 8,
      y: displayY + 8,
      displayName,
      currentAmmo: this.currentAmmo,
      ammoReserves
    })

    this.STANDING_GUN_ANGLE = gunAngle * 0.1
    this.WALKING_GUN_ANGLE = gunAngle
    this.DASHING_GUN_ANGLE = gunAngle * 3

    this.standingFiringCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange,
      gunAngle: this.STANDING_GUN_ANGLE,
      firingConeColour
    })

    this.walkingFiringCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange,
      gunAngle: this.WALKING_GUN_ANGLE,
      firingConeColour
    })

    this.dashingFiringCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange,
      gunAngle: this.DASHING_GUN_ANGLE,
      firingConeColour
    })

    this.firingCone = this.walkingFiringCone
  }

  stand () {
    this.firingCone = this.standingFiringCone
    this.bulletAngleVariance = 0.5 * this.STANDING_GUN_ANGLE
  }

  walk () {
    this.firingCone = this.walkingFiringCone
    this.bulletAngleVariance = 0.5 * this.WALKING_GUN_ANGLE
  }

  dash () {
    this.firingCone = this.dashingFiringCone
    this.bulletAngleVariance = 0.5 * this.DASHING_GUN_ANGLE
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

  pickUpAmmo (bullets) {
    this.ammoReserves += bullets
    this.weaponDisplay.setAmmoReserves(this.ammoReserves)
  }
}

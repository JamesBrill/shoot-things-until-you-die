import Phaser from 'phaser'
import FiringCone from '../sprites/FiringCone'
import WeaponDisplay from '../ui/WeaponDisplay'

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
    this.maxBullets = 8
    this.currentAmmo = this.maxBullets
    this.ammoReserves = 64
    this.weaponDisplay = new WeaponDisplay({
      game,
      x: 0,
      y: 0,
      displayName: 'Model 1887',
      currentAmmo: this.currentAmmo,
      ammoReserves: this.ammoReserves
    })

    this.firingCone = new FiringCone({
      game,
      x: 0,
      y: 0,
      gunRange: LeverActionShotgun.GUN_RANGE,
      gunAngle: LeverActionShotgun.GUN_ANGLE
    })

    this.loadingShell = false
    this.reloading = false
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

  reload () {
    if (this.ammoReserves > 0 && !this.reloading) {
      const bulletsToLoad = Math.min(
        this.ammoReserves,
        this.maxBullets - this.currentAmmo
      )
      const callback = () => {
        this.ammoReserves -= bulletsToLoad
        this.currentAmmo += bulletsToLoad
        this.weaponDisplay.setAmmoReserves(this.ammoReserves)
        this.weaponDisplay.setCurrentAmmo(this.currentAmmo)
        this.reloading = false
      }
      this.reloading = true
      setTimeout(callback.bind(this), LeverActionShotgun.RELOAD_TIME)
    }
  }

  fire () {
    if (this.currentAmmo === 0 && !this.reloading) {
      this.reload()
    } else if (!this.loadingShell && !this.reloading) {
      this.loadingShell = true
      this.fireSound.play()
      for (let i = 0; i < 12; i++) {
        super.fire()
      }
      this.currentAmmo -= 1
      if (this.currentAmmo >= 0) {
        this.weaponDisplay.setCurrentAmmo(this.currentAmmo)
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
LeverActionShotgun.NUMBER_OF_BULLETS = 10
LeverActionShotgun.FIRE_RATE = 1250
LeverActionShotgun.BULLET_SPEED = 2000
LeverActionShotgun.ATTACK_DAMAGE = 100
LeverActionShotgun.RELOAD_TIME = 3000

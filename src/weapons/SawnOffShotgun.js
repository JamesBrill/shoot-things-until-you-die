import Shotgun from './Shotgun'

export default class SawnOffShotgun extends Shotgun {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('semi_auto_shotgun_fire'),
      loadSound: game.add.audio('semi_auto_shotgun_load'),
      cockSound: game.add.audio('sawn_off_shotgun_cock'),
      numberOfBullets: SawnOffShotgun.NUMBER_OF_BULLETS,
      gunRange: SawnOffShotgun.GUN_RANGE,
      gunAngle: SawnOffShotgun.GUN_ANGLE,
      bulletSpeed: SawnOffShotgun.BULLET_SPEED,
      attackDamage: SawnOffShotgun.ATTACK_DAMAGE,
      reloadTime: SawnOffShotgun.RELOAD_TIME,
      fireRate: SawnOffShotgun.FIRE_RATE,
      maxBullets: SawnOffShotgun.MAX_BULLETS,
      ammoReserves: SawnOffShotgun.AMMO_RESERVES,
      displayName: SawnOffShotgun.DISPLAY_NAME,
      displayY: SawnOffShotgun.DISPLAY_Y
    })

    this.loadTime = SawnOffShotgun.LOAD_TIME
  }

  reload () {
    if (
      this.ammoReserves > 0 &&
      !this.reloading &&
      this.currentAmmo !== this.maxBullets
    ) {
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
      this.loadSound.play()
      if (this.currentAmmo === 0 && this.ammoReserves > 1) {
        setTimeout(() => this.loadSound.play(), this.loadTime)
        setTimeout(() => this.cockSound.play(), 2 * this.loadTime)
        this.reloadTimeout = setTimeout(callback.bind(this), 2 * this.loadTime + this.reloadTime)
      } else {
        setTimeout(() => this.cockSound.play(), this.loadTime)
        this.reloadTimeout = setTimeout(callback.bind(this), this.loadTime + this.reloadTime)
      }
    }
  }

  hitTarget () {
    // Sawn-off shotgun shells cut through everything
    // Note that because of this, they hit larger enemies multiple times
  }
}

SawnOffShotgun.GUN_RANGE = 200
SawnOffShotgun.GUN_ANGLE = 45
SawnOffShotgun.NUMBER_OF_BULLETS = 12
SawnOffShotgun.FIRE_RATE = 0
SawnOffShotgun.BULLET_SPEED = 1000
SawnOffShotgun.ATTACK_DAMAGE = 300
SawnOffShotgun.LOAD_TIME = 400
SawnOffShotgun.RELOAD_TIME = 1410
SawnOffShotgun.MAX_BULLETS = 2
SawnOffShotgun.AMMO_RESERVES = 30
SawnOffShotgun.DISPLAY_NAME = 'Sawn-off Shotgun'
SawnOffShotgun.DISPLAY_Y = 100

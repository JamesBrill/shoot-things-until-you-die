import Weapon from './Weapon'

export default class BurstFireWeapon extends Weapon {
  constructor ({ game, reloadSound, ...others }) {
    super({ game, ...others })
    this.reloadSound = reloadSound
    this.loadingBullet = false
    this.reloading = false
  }

  loadNewBullet () {
    this.loadingBullet = false
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
      this.reloadSound.play()
      setTimeout(callback.bind(this), this.reloadTime)
    }
  }

  fire () {
    if (this.currentAmmo === 0 && !this.reloading) {
      if (this.ammoReserves === 0) {
        this.playDryFireSound()
      } else {
        this.reload()
      }
    } else if (!this.loadingBullet && !this.reloading) {
      this.loadingBullet = true
      const fireBullet = () => {
        this.fireSound.play()
        super.fire()
        this.currentAmmo -= 1
        if (this.currentAmmo >= 0) {
          this.weaponDisplay.setCurrentAmmo(this.currentAmmo)
        }
      }
      fireBullet()
      setTimeout(fireBullet, 75)
      setTimeout(fireBullet, 150)
      setTimeout(this.loadNewBullet.bind(this), this.actualFireRate)
    }
  }
}

import Weapon from './Weapon'

export default class Shotgun extends Weapon {
  constructor ({ game, loadSound, cockSound, ...others }) {
    super({ game, ...others })
    this.loadSound = loadSound
    this.cockSound = cockSound
    this.loadingShell = false
    this.reloading = false
    this.reloadTimeout = null
  }

  loadNewShell () {
    this.loadingShell = false
  }

  reload () {
    if (
      this.ammoReserves > 0 &&
      this.currentAmmo < this.maxBullets &&
      !this.reloading &&
      !this.loadingShell
    ) {
      const callback = () => {
        this.ammoReserves -= 1
        this.currentAmmo += 1
        this.weaponDisplay.setAmmoReserves(this.ammoReserves)
        this.weaponDisplay.setCurrentAmmo(this.currentAmmo)
        if (this.currentAmmo < this.maxBullets && this.ammoReserves > 0) {
          this.loadSound.play()
          this.reloadTimeout = setTimeout(callback.bind(this), this.reloadTime)
        } else {
          this.cockSound.play()
          this.reloading = false
        }
      }
      this.reloading = true
      this.loadSound.play()
      this.reloadTimeout = setTimeout(callback.bind(this), this.reloadTime)
    }
  }

  fire () {
    if (this.currentAmmo > 0 && this.reloading && this.reloadTimeout !== null) {
      clearTimeout(this.reloadTimeout)
      this.reloading = false
    }

    if (this.currentAmmo === 0 && !this.reloading) {
      if (this.ammoReserves === 0) {
        this.playDryFireSound()
      } else {
        this.reload()
      }
    } else if (!this.loadingShell && !this.reloading) {
      this.loadingShell = true
      this.fireSound.play()
      for (let i = 0; i < this.numberOfBullets; i++) {
        super.fire()
      }
      this.currentAmmo -= 1
      if (this.currentAmmo >= 0) {
        this.weaponDisplay.setCurrentAmmo(this.currentAmmo)
      }
      setTimeout(this.loadNewShell.bind(this), this.actualFireRate)
    }
  }
}

export default class WeaponDisplay {
  constructor ({ game, x, y, displayName, currentAmmo, ammoReserves }) {
    this.displayName = displayName
    this.currentAmmo = currentAmmo
    this.ammoReserves = ammoReserves
    this.game = game
    this.weaponNameText = this.game.add.text(x, y, displayName, {
      font: '16px Arial',
      fill: 'red',
      align: 'center'
    })
    this.weaponNameText.fixedToCamera = true
    this.weaponNameText.cameraOffset.setTo(x, y)

    this.weaponCurrentAmmoText = this.game.add.text(x, y, currentAmmo, {
      font: '16px Arial',
      fill: 'red',
      align: 'center'
    })
    this.weaponCurrentAmmoText.fixedToCamera = true
    this.weaponCurrentAmmoText.cameraOffset.setTo(x, y + 20)

    this.weaponAmmoReservesText = this.game.add.text(x, y, ammoReserves, {
      font: '16px Arial',
      fill: 'red',
      align: 'center'
    })
    this.weaponAmmoReservesText.fixedToCamera = true
    this.weaponAmmoReservesText.cameraOffset.setTo(x + 30, y + 20)
  }

  setAmmoReserves (ammoReserves) {
    this.ammoReserves = ammoReserves
    this.weaponAmmoReservesText.setText(this.ammoReserves)
  }

  setCurrentAmmo (currentAmmo) {
    this.currentAmmo = currentAmmo
    this.weaponCurrentAmmoText.setText(this.currentAmmo)
  }
}

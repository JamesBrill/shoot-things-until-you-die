export default class WeaponDisplay {
  constructor ({ game, x, y, weapon }) {
    this.weaponDisplayName = weapon.displayName
    this.game = game
    this.weaponNameText = this.game.add.text(x, y, this.weaponDisplayName, {
      font: '16px Arial',
      fill: 'red',
      align: 'center'
    })
    this.weaponNameText.fixedToCamera = true
    this.weaponNameText.cameraOffset.setTo(x, y)

    this.weaponCurrentAmmoText = this.game.add.text(x, y, '10', {
      font: '16px Arial',
      fill: 'red',
      align: 'center'
    })
    this.weaponCurrentAmmoText.fixedToCamera = true
    this.weaponCurrentAmmoText.cameraOffset.setTo(x, y + 20)

    this.weaponAmmoReserveText = this.game.add.text(x, y, '100', {
      font: '16px Arial',
      fill: 'red',
      align: 'center'
    })
    this.weaponAmmoReserveText.fixedToCamera = true
    this.weaponAmmoReserveText.cameraOffset.setTo(x + 30, y + 20)
  }
}

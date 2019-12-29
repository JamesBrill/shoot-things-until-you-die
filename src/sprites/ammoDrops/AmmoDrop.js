import Phaser from 'phaser'

export default class AmmoDrop extends Phaser.Sprite {
  constructor ({ game, x, y, weaponName, bullets, spriteName }) {
    super(game, x, y, spriteName)
    this.weaponName = weaponName
    this.bullets = bullets
  }
}

AmmoDrop.createRandom = (game, x, y) => {
  const ammoTypePicker = Math.random()
  let weaponName, bullets, spriteName
  if (ammoTypePicker < 0.16) {
    weaponName = 'pistol'
    bullets = 64
    spriteName = 'pistol_ammo'
  } else if (ammoTypePicker < 0.32) {
    weaponName = 'leverActionShotgun'
    bullets = 24
    spriteName = 'model_1887_ammo'
  } else if (ammoTypePicker < 0.48) {
    weaponName = 'semiAutoShotgun'
    bullets = 30
    spriteName = 'shotgun_ammo'
  } else if (ammoTypePicker < 0.64) {
    weaponName = 'p90'
    bullets = 200
    spriteName = 'p90'
  } else if (ammoTypePicker < 0.8) {
    weaponName = 'ghostPistol'
    bullets = 64
    spriteName = 'ghost_pistol_ammo'
  } else {
    weaponName = 'm16'
    bullets = 60
    spriteName = 'm16'
  }
  return new AmmoDrop({
    game,
    x,
    y,
    weaponName,
    bullets,
    spriteName
  })
}

AmmoDrop.addAmmo = (weapons, ammoDrop) => {
  weapons[ammoDrop.weaponName].pickUpAmmo(ammoDrop.bullets)
}

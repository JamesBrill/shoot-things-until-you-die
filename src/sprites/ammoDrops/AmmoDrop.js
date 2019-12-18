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
  let ammoType, weaponName, bullets, spriteName
  if (ammoTypePicker < 0.16) {
    ammoType = AmmoDrop.PISTOL_AMMO_SPRITE
    weaponName = 'pistol'
    bullets = 64
    spriteName = 'pistol_ammo'
  } else if (ammoTypePicker < 0.32) {
    ammoType = AmmoDrop.LEVER_ACTION_SHOTGUN_AMMO_SPRITE
    weaponName = 'leverActionShotgun'
    bullets = 24
    spriteName = 'model_1887_ammo'
  } else if (ammoTypePicker < 0.48) {
    ammoType = AmmoDrop.SEMI_AUTO_SHOTGUN_AMMO_SPRITE
    weaponName = 'semiAutoShotgun'
    bullets = 30
    spriteName = 'shotgun_ammo'
  } else if (ammoTypePicker < 0.64) {
    ammoType = AmmoDrop.ASSAULT_RIFLE_AMMO_SPRITE
    weaponName = 'p90'
    bullets = 200
    spriteName = 'assault_rifle_ammo'
  } else if (ammoTypePicker < 0.8) {
    ammoType = AmmoDrop.GHOST_PISTOL_AMMO_SPRITE
    weaponName = 'ghostPistol'
    bullets = 64
    spriteName = 'ghost_pistol_ammo'
  } else {
    ammoType = AmmoDrop.ASSAULT_RIFLE_AMMO_SPRITE
    weaponName = 'm16'
    bullets = 60
    spriteName = 'assault_rifle_ammo'
  }
  return new AmmoDrop({
    game,
    x,
    y,
    ammoType,
    weaponName,
    bullets,
    spriteName
  })
}

AmmoDrop.addAmmo = (weapons, ammoDrop) => {
  weapons[ammoDrop.weaponName].pickUpAmmo(ammoDrop.bullets)
}

AmmoDrop.PISTOL_AMMO_SPRITE = 10
AmmoDrop.LEVER_ACTION_SHOTGUN_AMMO_SPRITE = 15
AmmoDrop.SEMI_AUTO_SHOTGUN_AMMO_SPRITE = 20
AmmoDrop.ASSAULT_RIFLE_AMMO_SPRITE = 25
AmmoDrop.GHOST_PISTOL_AMMO_SPRITE = 25

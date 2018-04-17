import Phaser from 'phaser'

export default class AmmoDrop extends Phaser.Sprite {
  constructor ({ game, x, y, ammoType, weaponName, bullets, spriteName }) {
    super(game, x, y, spriteName)
    this.weaponName = weaponName
    this.bullets = bullets
  }
}

AmmoDrop.createRandom = (game, world) => {
  const { width, height } = world
  const randomX = Math.random() * width - 0.5 * width
  const randomY = Math.random() * height - 0.5 * height
  const ammoTypePicker = Math.random()
  let ammoType, weaponName, bullets, spriteName
  if (ammoTypePicker < 0.4) {
    ammoType = AmmoDrop.PISTOL_AMMO_SPRITE
    weaponName = 'pistol'
    bullets = 64
    spriteName = 'pistol_ammo'
  } else if (ammoTypePicker < 0.55) {
    ammoType = AmmoDrop.LEVER_ACTION_SHOTGUN_AMMO_SPRITE
    weaponName = 'leverActionShotgun'
    bullets = 32
    spriteName = 'model_1887_ammo'
  } else if (ammoTypePicker < 0.8) {
    ammoType = AmmoDrop.SEMI_AUTO_SHOTGUN_AMMO_SPRITE
    weaponName = 'semiAutoShotgun'
    bullets = 20
    spriteName = 'shotgun_ammo'
  } else {
    ammoType = AmmoDrop.ASSAULT_RIFLE_AMMO_SPRITE
    weaponName = 'assaultRifle'
    bullets = 120
    spriteName = 'assault_rifle_ammo'
  }
  return new AmmoDrop({
    game,
    x: world.centerX + randomX,
    y: world.centerY + randomY,
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

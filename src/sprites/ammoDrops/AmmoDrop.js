import Phaser from 'phaser'

export default class AmmoDrop extends Phaser.Sprite {
  constructor ({ game, x, y, ammoType, weaponName, bullets }) {
    const ammoDropGraphics = game.add.graphics(x, y)
    ammoDropGraphics.beginFill(0x0000ff, 1)
    ammoDropGraphics.drawCircle(x, y, ammoType)
    ammoDropGraphics.endFill()
    super(game, x, y, ammoDropGraphics.generateTexture())
    ammoDropGraphics.destroy()
    this.weaponName = weaponName
    this.bullets = bullets
  }
}

AmmoDrop.createRandom = (game, world) => {
  const { width, height } = world
  const randomX = Math.random() * width - 0.5 * width
  const randomY = Math.random() * height - 0.5 * height
  const ammoTypePicker = Math.random()
  let ammoType, weaponName, bullets
  if (ammoTypePicker < 0.4) {
    ammoType = AmmoDrop.PISTOL_AMMO_SPRITE
    weaponName = 'pistol'
    bullets = 64
  } else if (ammoTypePicker < 0.55) {
    ammoType = AmmoDrop.LEVER_ACTION_SHOTGUN_AMMO_SPRITE
    weaponName = 'leverActionShotgun'
    bullets = 32
  } else if (ammoTypePicker < 0.8) {
    ammoType = AmmoDrop.SEMI_AUTO_SHOTGUN_AMMO_SPRITE
    weaponName = 'semiAutoShotgun'
    bullets = 20
  } else {
    ammoType = AmmoDrop.ASSAULT_RIFLE_AMMO_SPRITE
    weaponName = 'assaultRifle'
    bullets = 120
  }
  return new AmmoDrop({
    game,
    x: world.centerX + randomX,
    y: world.centerY + randomY,
    ammoType,
    weaponName,
    bullets
  })
}

AmmoDrop.addAmmo = (weapons, ammoDrop) => {
  weapons[ammoDrop.weaponName].pickUpAmmo(ammoDrop.bullets)
}

AmmoDrop.PISTOL_AMMO_SPRITE = 10
AmmoDrop.LEVER_ACTION_SHOTGUN_AMMO_SPRITE = 15
AmmoDrop.SEMI_AUTO_SHOTGUN_AMMO_SPRITE = 20
AmmoDrop.ASSAULT_RIFLE_AMMO_SPRITE = 25

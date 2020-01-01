import AutomaticWeapon from './AutomaticWeapon'

export default class Pistol extends AutomaticWeapon {
  constructor ({ game, firingConeColour, weaponDisplay, fireSound }) {
    super({
      game,
      fireSound: fireSound || game.add.audio('pistol_fire'),
      reloadSound: game.add.audio('pistol_reload'),
      numberOfBullets: Pistol.NUMBER_OF_BULLETS,
      gunRange: Pistol.GUN_RANGE,
      gunAngle: Pistol.GUN_ANGLE,
      bulletSpeed: Pistol.BULLET_SPEED,
      attackDamage: Pistol.ATTACK_DAMAGE,
      reloadTime: Pistol.RELOAD_TIME,
      fireRate: Pistol.FIRE_RATE,
      maxBullets: Pistol.MAX_BULLETS,
      ammoReserves: Pistol.AMMO_RESERVES,
      displayName: Pistol.DISPLAY_NAME,
      displayY: Pistol.DISPLAY_Y,
      firingConeColour,
      weaponDisplay,
      singleFire: true
    })
  }
}

Pistol.GUN_RANGE = 500
Pistol.GUN_ANGLE = 10
Pistol.NUMBER_OF_BULLETS = 30
Pistol.FIRE_RATE = 0
Pistol.BULLET_SPEED = 1000
Pistol.ATTACK_DAMAGE = 120
Pistol.RELOAD_TIME = 1032
Pistol.MAX_BULLETS = 12
Pistol.AMMO_RESERVES = 128
Pistol.DISPLAY_NAME = 'Pistol'
Pistol.DISPLAY_Y = 0

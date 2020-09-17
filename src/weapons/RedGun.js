import AutomaticWeapon from './AutomaticWeapon'

export default class RedGun extends AutomaticWeapon {
  constructor ({ game, firingConeColour, weaponDisplay, fireSound }) {
    super({
      game,
      fireSound: fireSound || game.add.audio('pistol_fire'),
      reloadSound: game.add.audio('pistol_reload'),
      numberOfBullets: RedGun.NUMBER_OF_BULLETS,
      gunRange: RedGun.GUN_RANGE,
      gunAngle: RedGun.GUN_ANGLE,
      bulletSpeed: RedGun.BULLET_SPEED,
      attackDamage: RedGun.ATTACK_DAMAGE,
      reloadTime: RedGun.RELOAD_TIME,
      fireRate: RedGun.FIRE_RATE,
      maxBullets: RedGun.MAX_BULLETS,
      ammoReserves: RedGun.AMMO_RESERVES,
      displayName: RedGun.DISPLAY_NAME,
      displayY: RedGun.DISPLAY_Y,
      firingConeColour,
      weaponDisplay,
      singleFire: true,
      bulletTexture: 'red_bullet',
      colour: 0xff0000
    })
  }
}

RedGun.GUN_RANGE = 500
RedGun.GUN_ANGLE = 10
RedGun.NUMBER_OF_BULLETS = 30
RedGun.FIRE_RATE = 0
RedGun.BULLET_SPEED = 1000
RedGun.ATTACK_DAMAGE = 120
RedGun.RELOAD_TIME = 1032
RedGun.MAX_BULLETS = 12
RedGun.AMMO_RESERVES = 128
RedGun.DISPLAY_NAME = 'Red Gun'
RedGun.DISPLAY_Y = 0

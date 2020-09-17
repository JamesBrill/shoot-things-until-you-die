import AutomaticWeapon from './AutomaticWeapon'

export default class BlueGun extends AutomaticWeapon {
  constructor ({ game, firingConeColour, weaponDisplay, fireSound }) {
    super({
      game,
      fireSound: fireSound || game.add.audio('pistol_fire'),
      reloadSound: game.add.audio('pistol_reload'),
      numberOfBullets: BlueGun.NUMBER_OF_BULLETS,
      gunRange: BlueGun.GUN_RANGE,
      gunAngle: BlueGun.GUN_ANGLE,
      bulletSpeed: BlueGun.BULLET_SPEED,
      attackDamage: BlueGun.ATTACK_DAMAGE,
      reloadTime: BlueGun.RELOAD_TIME,
      fireRate: BlueGun.FIRE_RATE,
      maxBullets: BlueGun.MAX_BULLETS,
      ammoReserves: BlueGun.AMMO_RESERVES,
      displayName: BlueGun.DISPLAY_NAME,
      displayY: BlueGun.DISPLAY_Y,
      firingConeColour,
      weaponDisplay,
      singleFire: true,
      bulletTexture: 'blue_bullet',
      colour: 0x0000ff
    })
  }
}

BlueGun.GUN_RANGE = 500
BlueGun.GUN_ANGLE = 10
BlueGun.NUMBER_OF_BULLETS = 30
BlueGun.FIRE_RATE = 0
BlueGun.BULLET_SPEED = 1000
BlueGun.ATTACK_DAMAGE = 120
BlueGun.RELOAD_TIME = 1032
BlueGun.MAX_BULLETS = 12
BlueGun.AMMO_RESERVES = 128
BlueGun.DISPLAY_NAME = 'Blue Gun'
BlueGun.DISPLAY_Y = 50

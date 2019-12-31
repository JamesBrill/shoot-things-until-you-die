import AutomaticWeapon from './AutomaticWeapon'

export default class P90 extends AutomaticWeapon {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('assault_rifle_fire'),
      reloadSound: game.add.audio('assault_rifle_reload'),
      numberOfBullets: P90.NUMBER_OF_BULLETS,
      gunRange: P90.GUN_RANGE,
      gunAngle: P90.GUN_ANGLE,
      bulletSpeed: P90.BULLET_SPEED,
      attackDamage: P90.ATTACK_DAMAGE,
      reloadTime: P90.RELOAD_TIME,
      fireRate: P90.FIRE_RATE,
      maxBullets: P90.MAX_BULLETS,
      ammoReserves: P90.AMMO_RESERVES,
      displayName: P90.DISPLAY_NAME,
      displayY: P90.DISPLAY_Y
    })
  }
}

P90.GUN_RANGE = 750
P90.GUN_ANGLE = 10
P90.NUMBER_OF_BULLETS = 30
P90.FIRE_RATE = 40
P90.BULLET_SPEED = 1000
P90.ATTACK_DAMAGE = 50
P90.RELOAD_TIME = 1830
P90.MAX_BULLETS = 100
P90.AMMO_RESERVES = 200
P90.DISPLAY_NAME = 'P90'
P90.DISPLAY_Y = 150

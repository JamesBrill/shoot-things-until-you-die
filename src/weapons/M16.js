import BurstFireWeapon from './BurstFireWeapon'

export default class M16 extends BurstFireWeapon {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('assault_rifle_fire'),
      reloadSound: game.add.audio('assault_rifle_reload'),
      bulletLength: M16.BULLET_LENGTH,
      numberOfBullets: M16.NUMBER_OF_BULLETS,
      gunRange: M16.GUN_RANGE,
      gunAngle: M16.GUN_ANGLE,
      bulletSpeed: M16.BULLET_SPEED,
      attackDamage: M16.ATTACK_DAMAGE,
      reloadTime: M16.RELOAD_TIME,
      fireRate: M16.FIRE_RATE,
      maxBullets: M16.MAX_BULLETS,
      ammoReserves: M16.AMMO_RESERVES,
      displayName: M16.DISPLAY_NAME,
      displayY: M16.DISPLAY_Y
    })
  }

  hitTarget () {
    // M16 bullets cut through everything
  }
}

M16.GUN_RANGE = 1000
M16.GUN_ANGLE = 1
M16.BULLET_LENGTH = 30
M16.NUMBER_OF_BULLETS = 30
M16.FIRE_RATE = 500
M16.BULLET_SPEED = 3000
M16.ATTACK_DAMAGE = 200
M16.RELOAD_TIME = 1830
M16.MAX_BULLETS = 30
M16.AMMO_RESERVES = 120
M16.DISPLAY_NAME = 'M16'
M16.DISPLAY_Y = 200

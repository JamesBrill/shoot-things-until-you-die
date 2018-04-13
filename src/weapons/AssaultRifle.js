import AutomaticWeapon from './AutomaticWeapon'

export default class AssaultRifle extends AutomaticWeapon {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('assault_rifle_fire'),
      reloadSound: game.add.audio('assault_rifle_reload'),
      bulletLength: AssaultRifle.BULLET_LENGTH,
      numberOfBullets: AssaultRifle.NUMBER_OF_BULLETS,
      gunRange: AssaultRifle.GUN_RANGE,
      gunAngle: AssaultRifle.GUN_ANGLE,
      bulletSpeed: AssaultRifle.BULLET_SPEED,
      attackDamage: AssaultRifle.ATTACK_DAMAGE,
      reloadTime: AssaultRifle.RELOAD_TIME,
      fireRate: AssaultRifle.FIRE_RATE,
      maxBullets: AssaultRifle.MAX_BULLETS,
      ammoReserves: AssaultRifle.AMMO_RESERVES,
      displayName: AssaultRifle.DISPLAY_NAME,
      displayY: AssaultRifle.DISPLAY_Y
    })
  }
}

AssaultRifle.GUN_RANGE = 700
AssaultRifle.GUN_ANGLE = 5
AssaultRifle.BULLET_LENGTH = 20
AssaultRifle.NUMBER_OF_BULLETS = 30
AssaultRifle.FIRE_RATE = 100
AssaultRifle.BULLET_SPEED = 2000
AssaultRifle.ATTACK_DAMAGE = 50
AssaultRifle.RELOAD_TIME = 1830
AssaultRifle.MAX_BULLETS = 60
AssaultRifle.AMMO_RESERVES = 120
AssaultRifle.DISPLAY_NAME = 'Assault Rifle'
AssaultRifle.DISPLAY_Y = 150

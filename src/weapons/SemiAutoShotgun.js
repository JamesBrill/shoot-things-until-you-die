import Shotgun from './Shotgun'

export default class SemiAutoShotgun extends Shotgun {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('semi_auto_shotgun_fire'),
      loadSound: game.add.audio('semi_auto_shotgun_load'),
      cockSound: game.add.audio('semi_auto_shotgun_cock'),
      bulletLength: SemiAutoShotgun.BULLET_LENGTH,
      numberOfBullets: SemiAutoShotgun.NUMBER_OF_BULLETS,
      gunRange: SemiAutoShotgun.GUN_RANGE,
      gunAngle: SemiAutoShotgun.GUN_ANGLE,
      bulletSpeed: SemiAutoShotgun.BULLET_SPEED,
      attackDamage: SemiAutoShotgun.ATTACK_DAMAGE,
      reloadTime: SemiAutoShotgun.RELOAD_TIME,
      fireRate: SemiAutoShotgun.FIRE_RATE,
      maxBullets: SemiAutoShotgun.MAX_BULLETS,
      ammoReserves: SemiAutoShotgun.AMMO_RESERVES,
      displayName: SemiAutoShotgun.DISPLAY_NAME,
      displayY: SemiAutoShotgun.DISPLAY_Y
    })
  }
}

SemiAutoShotgun.GUN_RANGE = 200
SemiAutoShotgun.GUN_ANGLE = 45
SemiAutoShotgun.BULLET_LENGTH = 10
SemiAutoShotgun.NUMBER_OF_BULLETS = 12
SemiAutoShotgun.FIRE_RATE = 600
SemiAutoShotgun.BULLET_SPEED = 1500
SemiAutoShotgun.ATTACK_DAMAGE = 30
SemiAutoShotgun.RELOAD_TIME = 400
SemiAutoShotgun.MAX_BULLETS = 10
SemiAutoShotgun.AMMO_RESERVES = 80
SemiAutoShotgun.DISPLAY_NAME = 'Shotgun'
SemiAutoShotgun.DISPLAY_Y = 50

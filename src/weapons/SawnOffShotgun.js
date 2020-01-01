import Shotgun from './Shotgun'

export default class SawnOffShotgun extends Shotgun {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('semi_auto_shotgun_fire'),
      loadSound: game.add.audio('semi_auto_shotgun_load'),
      cockSound: game.add.audio('sawn_off_shotgun_cock'),
      numberOfBullets: SawnOffShotgun.NUMBER_OF_BULLETS,
      gunRange: SawnOffShotgun.GUN_RANGE,
      gunAngle: SawnOffShotgun.GUN_ANGLE,
      bulletSpeed: SawnOffShotgun.BULLET_SPEED,
      attackDamage: SawnOffShotgun.ATTACK_DAMAGE,
      reloadTime: SawnOffShotgun.RELOAD_TIME,
      fireRate: SawnOffShotgun.FIRE_RATE,
      maxBullets: SawnOffShotgun.MAX_BULLETS,
      ammoReserves: SawnOffShotgun.AMMO_RESERVES,
      displayName: SawnOffShotgun.DISPLAY_NAME,
      displayY: SawnOffShotgun.DISPLAY_Y
    })
  }

  hitTarget () {
    // Sawn-off shotgun shells cut through everything
    // Note that because of this, they hit larger enemies multiple times
  }
}

SawnOffShotgun.GUN_RANGE = 250
SawnOffShotgun.GUN_ANGLE = 45
SawnOffShotgun.NUMBER_OF_BULLETS = 12
SawnOffShotgun.FIRE_RATE = 300
SawnOffShotgun.BULLET_SPEED = 1000
SawnOffShotgun.ATTACK_DAMAGE = 300
SawnOffShotgun.RELOAD_TIME = 400
SawnOffShotgun.MAX_BULLETS = 2
SawnOffShotgun.AMMO_RESERVES = 30
SawnOffShotgun.DISPLAY_NAME = 'Sawn-off Shotgun'
SawnOffShotgun.DISPLAY_Y = 100

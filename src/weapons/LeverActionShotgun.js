import Shotgun from './Shotgun'

export default class LeverActionShotgun extends Shotgun {
  constructor ({ game }) {
    super({
      game,
      fireSound: game.add.audio('lever_action_shotgun_fire'),
      loadSound: game.add.audio('lever_action_shotgun_load'),
      cockSound: game.add.audio('lever_action_shotgun_cock'),
      bulletLength: LeverActionShotgun.BULLET_LENGTH,
      numberOfBullets: LeverActionShotgun.NUMBER_OF_BULLETS,
      gunRange: LeverActionShotgun.GUN_RANGE,
      gunAngle: LeverActionShotgun.GUN_ANGLE,
      bulletSpeed: LeverActionShotgun.BULLET_SPEED,
      attackDamage: LeverActionShotgun.ATTACK_DAMAGE,
      reloadTime: LeverActionShotgun.RELOAD_TIME,
      fireRate: LeverActionShotgun.FIRE_RATE,
      maxBullets: LeverActionShotgun.MAX_BULLETS,
      ammoReserves: LeverActionShotgun.AMMO_RESERVES,
      displayName: LeverActionShotgun.DISPLAY_NAME,
      displayY: LeverActionShotgun.DISPLAY_Y
    })
  }

  hitTarget () {
    // Lever action shotgun bullets cut through everything
  }
}

LeverActionShotgun.GUN_RANGE = 350
LeverActionShotgun.GUN_ANGLE = 20
LeverActionShotgun.BULLET_LENGTH = 20
LeverActionShotgun.NUMBER_OF_BULLETS = 10
LeverActionShotgun.FIRE_RATE = 1250
LeverActionShotgun.BULLET_SPEED = 2000
LeverActionShotgun.ATTACK_DAMAGE = 100
LeverActionShotgun.RELOAD_TIME = 600
LeverActionShotgun.MAX_BULLETS = 8
LeverActionShotgun.AMMO_RESERVES = 64
LeverActionShotgun.DISPLAY_NAME = 'Model 1887'
LeverActionShotgun.DISPLAY_Y = 0

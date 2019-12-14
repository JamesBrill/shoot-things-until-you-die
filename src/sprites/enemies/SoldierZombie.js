import ZombieGun from '../../weapons/ZombieGun'
import ZombieNavigation from '../../ai/ZombieNavigation'

import Zombie from './Zombie'

const ZombieMode = {
  FOLLOW: 'FOLLOW',
  STRAFE: 'STRAFE',
  RETREAT: 'RETREAT'
}

export default class SoldierZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier, pathfinder }) {
    super({
      game,
      x,
      y,
      player,
      speed: SoldierZombie.SPEED,
      size: SoldierZombie.SIZE,
      health: SoldierZombie.HEALTH * healthMultiplier,
      colour: SoldierZombie.COLOUR
    })
    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
    this.weapon = new ZombieGun({ game })
    this.armWeapon(this.weapon)

    this.mode = ZombieMode.FOLLOW
    this.strafeRight = true
  }

  move () {
    if (this.mode === ZombieMode.FOLLOW) {
      this.zombieNavigation.followPlayer({})
    } else if (this.mode === ZombieMode.STRAFE) {
      if (Math.random() > 0.99) {
        this.strafeRight = !this.strafeRight
      }
      this.strafe()
    } else {
      this.retreat()
    }
  }

  act () {
    const distanceToPlayer = Math.sqrt(
      (this.player.x - this.x) ** 2 + (this.player.y - this.y) ** 2
    )
    if (distanceToPlayer <= this.weapon.gunRange) {
      this.weapon.aimAt(this.player.x, this.player.y)
      this.weapon.fire()

      if (distanceToPlayer <= this.weapon.gunRange * 0.5) {
        this.mode = ZombieMode.RETREAT
      } else {
        this.mode = ZombieMode.STRAFE
      }
    } else {
      this.mode = ZombieMode.FOLLOW
    }
  }

  strafe () {
    const { angleBetween, radToDeg } = this.game.math
    const aimAngle = angleBetween(this.x, this.y, this.player.world.x, this.player.world.y)
    const strafeConstant = this.strafeRight ? 90 : -90
    const strafeAngle = radToDeg(aimAngle) + strafeConstant
    this.game.physics.arcade.velocityFromAngle(strafeAngle, this.speed * 2, this.body.velocity)
  }

  retreat () {
    const { angleBetween, radToDeg } = this.game.math
    const aimAngle = angleBetween(this.x, this.y, this.player.world.x, this.player.world.y)
    const strafeAngle = radToDeg(aimAngle) + 180
    this.game.physics.arcade.velocityFromAngle(strafeAngle, this.speed, this.body.velocity)
  }

  switchMode () {
    if (this.mode === ZombieMode.FOLLOW) {
      this.mode = ZombieMode.STRAFE
    } else {
      this.mode = ZombieMode.FOLLOW
    }
  }

  armWeapon (weapon) {
    this.weapon = weapon
    weapon.arm(this)
  }
}

SoldierZombie.HEALTH = 200
SoldierZombie.SPEED = 100
SoldierZombie.SIZE = 45
SoldierZombie.COLOUR = 0x006400

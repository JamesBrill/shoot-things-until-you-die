import throttle from 'lodash.throttle'
import ZombieBossGun from '../../weapons/ZombieBossGun'
import ZombieNavigation from '../../ai/ZombieNavigation'
import Zombie from './Zombie'

export default class BossZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier, pathfinder }) {
    super({
      game,
      x,
      y,
      player,
      speed: BossZombie.SPEED,
      size: BossZombie.SIZE,
      healthMultiplier: (healthMultiplier || 1) * 50,
      colour: BossZombie.COLOUR
    })

    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
    this.weapon = new ZombieBossGun({ game })
    this.armWeapon(this.weapon)

    this.fire = throttle(this.fire, 200)
  }

  move () {
    this.zombieNavigation.followPlayer()
  }

  act () {
    const distanceToPlayer = Math.sqrt(
      (this.player.x - this.x) ** 2 + (this.player.y - this.y) ** 2
    )
    if (distanceToPlayer <= this.weapon.gunRange) {
      this.fire()
    }
  }

  fire () {
    this.weapon.aimAt(this.player.x, this.player.y)
    this.weapon.fire()
  }

  armWeapon (weapon) {
    this.weapon = weapon
    weapon.arm(this)
  }
}

BossZombie.SPEED = 75
BossZombie.SIZE = 250
BossZombie.COLOUR = 0x800080

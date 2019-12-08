import ZombieSniper from '../../weapons/ZombieSniper'
import Zombie from './Zombie'

export default class SniperZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier }) {
    super({
      game,
      x,
      y,
      player,
      speed: SniperZombie.SPEED,
      size: SniperZombie.SIZE,
      healthMultiplier,
      colour: SniperZombie.COLOUR
    })
    this.weapon = new ZombieSniper({ game })
    this.armWeapon(this.weapon)
  }

  move () { }

  act () {
    const distanceToPlayer = Math.sqrt(
      (this.player.x - this.x) ** 2 + (this.player.y - this.y) ** 2
    )
    if (distanceToPlayer <= this.weapon.gunRange) {
      this.weapon.aimAt(this.player.x, this.player.y)
      this.weapon.fire()
    }
  }

  armWeapon (weapon) {
    this.weapon = weapon
    weapon.arm(this)
  }
}

SniperZombie.SPEED = 0
SniperZombie.SIZE = 45
SniperZombie.COLOUR = 0xff0000

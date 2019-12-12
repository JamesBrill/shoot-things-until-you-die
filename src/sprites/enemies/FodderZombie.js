import Zombie from './Zombie'
import ZombieNavigation from '../../ai/ZombieNavigation'

export default class FodderZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier, pathfinder }) {
    super({
      game,
      x,
      y,
      player,
      speed: FodderZombie.SPEED,
      size: FodderZombie.SIZE,
      health: FodderZombie.HEALTH * healthMultiplier,
      colour: FodderZombie.COLOUR
    })

    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
  }

  move () {
    this.zombieNavigation.followPlayer()
  }

  act () { }
}

FodderZombie.HEALTH = 100
FodderZombie.SPEED = 80
FodderZombie.SIZE = 45
FodderZombie.COLOUR = 0x75816b

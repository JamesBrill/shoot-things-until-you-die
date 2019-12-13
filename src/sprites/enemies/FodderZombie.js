import Zombie from './Zombie'
import ZombieNavigation from '../../ai/ZombieNavigation'

export default class FodderZombie extends Zombie {
  constructor ({ game, x, y, player, speedMultiplier, healthMultiplier, pathfinder }) {
    super({
      game,
      x,
      y,
      player,
      speed: Math.min(200, FodderZombie.SPEED * speedMultiplier),
      size: FodderZombie.SIZE,
      health: FodderZombie.HEALTH * healthMultiplier,
      colour: FodderZombie.COLOUR
    })
    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
  }

  move () {
    this.zombieNavigation.followPlayer(0.9)
  }

  act () { }
}

FodderZombie.HEALTH = 100
FodderZombie.SPEED = 80
FodderZombie.SIZE = 45
FodderZombie.COLOUR = 0x75816b

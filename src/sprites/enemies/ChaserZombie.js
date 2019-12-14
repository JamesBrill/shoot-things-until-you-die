import Zombie from './Zombie'
import ZombieNavigation from '../../ai/ZombieNavigation'

export default class ChaserZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier, pathfinder }) {
    super({
      game,
      x,
      y,
      player,
      speed: ChaserZombie.SPEED,
      size: ChaserZombie.SIZE,
      health: ChaserZombie.HEALTH * healthMultiplier,
      colour: ChaserZombie.COLOUR
    })

    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
  }

  move () {
    this.zombieNavigation.followPlayer({})
  }

  act () { }
}

ChaserZombie.HEALTH = 50
ChaserZombie.SPEED = 250
ChaserZombie.SIZE = 20
ChaserZombie.COLOUR = 0x0000ff

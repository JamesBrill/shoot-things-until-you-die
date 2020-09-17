import Zombie from './Zombie'
import ZombieNavigation from '../../ai/ZombieNavigation'

export default class ColourEnemy extends Zombie {
  constructor ({ game, x, y, player, speedMultiplier, healthMultiplier, pathfinder, enemies, colour }) {
    super({
      game,
      x,
      y,
      player,
      speed: Math.min(200, ColourEnemy.SPEED * speedMultiplier),
      size: ColourEnemy.SIZE,
      health: ColourEnemy.HEALTH * healthMultiplier,
      colour,
      enemies
    })
    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
  }

  move () {
    this.zombieNavigation.followPlayer({ strafeChangeChance: 0.95 })
  }

  act () { }
}

ColourEnemy.HEALTH = 100
ColourEnemy.SPEED = 80
ColourEnemy.SIZE = 45

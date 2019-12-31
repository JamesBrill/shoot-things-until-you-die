import Zombie from './Zombie'

export default class Ghost extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier }) {
    super({
      game,
      x,
      y,
      player,
      speed: Ghost.SPEED,
      size: Ghost.SIZE,
      health: Ghost.HEALTH * healthMultiplier,
      colour: Ghost.COLOUR
    })

    this.alpha = 0.5
    this.isGhost = true
  }

  move () {
    this.game.physics.arcade.moveToObject(this, this.player, this.speed)
  }

  act () { }

  update () {
    this.game.physics.arcade.overlap(
      this.player,
      this,
      this.handlePlayerDamage,
      null,
      this
    )
  }
}

Ghost.HEALTH = 50
Ghost.SPEED = 100
Ghost.SIZE = 45
Ghost.COLOUR = 0xffffff

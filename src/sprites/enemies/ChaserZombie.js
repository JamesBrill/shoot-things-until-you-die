import Zombie from './Zombie'

export default class ChaserZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier }) {
    super({
      game,
      x,
      y,
      player,
      speed: ChaserZombie.SPEED,
      size: ChaserZombie.SIZE,
      healthMultiplier,
      colour: ChaserZombie.COLOUR
    })
  }

  move () {
    this.game.physics.arcade.moveToObject(this, this.player, this.speed)
  }

  act () { }
}

ChaserZombie.SPEED = 200
ChaserZombie.SIZE = 20
ChaserZombie.COLOUR = 0x0000ff

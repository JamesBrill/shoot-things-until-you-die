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

    this.strafeRight = true
  }

  move () {
    if (Math.random() > 0.97) {
      this.strafeRight = !this.strafeRight
    }
    this.strafe()
  }

  strafe () {
    const { angleBetween, radToDeg } = this.game.math
    const aimAngle = angleBetween(this.x, this.y, this.player.world.x, this.player.world.y)
    const strafeConstant = this.strafeRight ? 30 : -30
    const strafeAngle = radToDeg(aimAngle) + strafeConstant
    this.game.physics.arcade.velocityFromAngle(strafeAngle, this.speed, this.body.velocity)
  }

  act () { }
}

ChaserZombie.SPEED = 250
ChaserZombie.SIZE = 20
ChaserZombie.COLOUR = 0x0000ff

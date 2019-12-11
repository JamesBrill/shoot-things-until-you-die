import Zombie from './Zombie'

export default class ChaserZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier, pathfinder }) {
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
    this.pathfinder = pathfinder
    this.TILE_SIZE = game.world.width / 30
    this.processingPath = false
  }

  move () {
    const zombieX = Math.floor(this.x / this.TILE_SIZE)
    const zombieY = Math.floor(this.y / this.TILE_SIZE)
    const playerX = Math.floor(this.player.world.x / this.TILE_SIZE)
    const playerY = Math.floor(this.player.world.y / this.TILE_SIZE)
    if (zombieX === playerX && zombieY === playerY) {
      this.game.physics.arcade.moveToObject(this, this.player, this.speed)
      return
    }

    if (this.processingPath) {
      return
    }

    if (Math.random() > 0.99) {
      this.strafeRight = !this.strafeRight
    }
    this.pathfinder.findPath(zombieX, zombieY, playerX, playerY, (path) => {
      if (path === null) {
        console.log('no path')
      } else {
        const { x, y } = path[1]
        const targetX = x * this.TILE_SIZE + 0.5 * this.TILE_SIZE
        const targetY = y * this.TILE_SIZE + 0.5 * this.TILE_SIZE
        this.strafe(targetX, targetY)
      }
      this.processingPath = false
    })
    this.processingPath = true
  }

  strafe (targetX, targetY) {
    if (this.game) {
      const { angleBetween, radToDeg } = this.game.math
      const aimAngle = angleBetween(this.x, this.y, targetX, targetY)
      const strafeConstant = this.strafeRight ? 30 : -30
      const strafeAngle = radToDeg(aimAngle) + strafeConstant
      this.game.physics.arcade.velocityFromAngle(strafeAngle, this.speed, this.body.velocity)
    }
  }

  act () { }
}

ChaserZombie.SPEED = 250
ChaserZombie.SIZE = 20
ChaserZombie.COLOUR = 0x0000ff

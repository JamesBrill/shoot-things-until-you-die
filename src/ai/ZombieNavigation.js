export default class ZombieNavigation {
  constructor ({ zombie, player, pathfinder, game }) {
    this.TILE_SIZE = game.world.width / game.map.width

    this.zombie = zombie
    this.player = player
    this.pathfinder = pathfinder
    this.game = game

    this.strafeRight = true
    this.processingPath = false
  }

  followPlayer (strafeChangeChance = 0.99) {
    const zombieX = Math.floor(this.zombie.x / this.TILE_SIZE)
    const zombieY = Math.floor(this.zombie.y / this.TILE_SIZE)
    const playerX = Math.floor(this.player.world.x / this.TILE_SIZE)
    const playerY = Math.floor(this.player.world.y / this.TILE_SIZE)
    if (zombieX === playerX && zombieY === playerY) {
      this.game.physics.arcade.moveToObject(this.zombie, this.player, this.zombie.speed)
      return
    }

    if (this.processingPath) {
      return
    }

    if (Math.random() > strafeChangeChance) {
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
    if (this.zombie.exists) {
      const { angleBetween, radToDeg } = this.game.math
      const aimAngle = angleBetween(this.zombie.x, this.zombie.y, targetX, targetY)
      const strafeConstant = this.strafeRight ? 30 : -30
      const strafeAngle = radToDeg(aimAngle) + strafeConstant
      this.game.physics.arcade.velocityFromAngle(strafeAngle, this.zombie.speed, this.zombie.body.velocity)
    }
  }
}

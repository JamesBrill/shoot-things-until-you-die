import Phaser from 'phaser'
import MapPositionGenerator from '../utils/MapPositionGenerator'

export default class ZombieNavigation {
  constructor ({ zombie, player, pathfinder, game }) {
    this.TILE_SIZE = game.world.width / game.map.width

    this.zombie = zombie
    this.player = player
    this.pathfinder = pathfinder
    this.game = game
    this.mapPositionGenerator = new MapPositionGenerator({ map: game.map, game })

    this.strafeRight = true
    this.processingPath = false
    this.target = null
  }

  followPlayer ({ strafeChangeChance, speed }) {
    this.followXY({
      x: this.player.world.x,
      y: this.player.world.y,
      strafeChangeChance,
      speed: speed || this.zombie.speed
    })
  }

  followXY ({ x, y, strafeChangeChance, speed }) {
    const zombieX = Math.floor(this.zombie.x / this.TILE_SIZE)
    const zombieY = Math.floor(this.zombie.y / this.TILE_SIZE)
    const followX = Math.floor(x / this.TILE_SIZE)
    const followY = Math.floor(y / this.TILE_SIZE)
    if (zombieX === followX && zombieY === followY) {
      this.game.physics.arcade.moveToObject(this.zombie, { x, y }, speed)
      return
    }

    if (this.processingPath) {
      return
    }

    if (Math.random() > (strafeChangeChance || 0.99)) {
      this.strafeRight = !this.strafeRight
    }
    this.pathfinder.findPath(zombieX, zombieY, followX, followY, (path) => {
      if (path === null || path.length <= 1 || !this.zombie || !this.zombie.body) {
        console.log('no path')
      } else {
        const { x, y } = path[1]
        const targetX = x * this.TILE_SIZE + 0.5 * this.TILE_SIZE
        const targetY = y * this.TILE_SIZE + 0.5 * this.TILE_SIZE
        this.strafe(targetX, targetY, speed)
      }
      this.processingPath = false
    })
    this.processingPath = true
  }

  strafe (targetX, targetY, speed) {
    if (this.zombie.exists) {
      const { angleBetween, radToDeg } = this.game.math
      const aimAngle = angleBetween(this.zombie.x, this.zombie.y, targetX, targetY)
      const strafeConstant = this.strafeRight ? 30 : -30
      const strafeAngle = radToDeg(aimAngle) + strafeConstant
      this.game.physics.arcade.velocityFromAngle(strafeAngle, speed, this.zombie.body.velocity)
    }
  }

  stopMoving () {
    this.zombie.body.velocity = new Phaser.Point(0, 0)
  }

  atTarget () {
    if (!this.target) {
      return false
    }
    return Math.abs(this.zombie.world.x - this.target.x) < 100 &&
           Math.abs(this.zombie.world.y - this.target.y) < 100
  }

  wander () {
    if (!this.target || this.atTarget()) {
      this.target = this.mapPositionGenerator.getRandomPosition()
    }
    this.goTo({ x: this.target.x, y: this.target.y })
  }

  goTo ({ x, y, strafeChangeChance }) {
    this.followXY({
      x,
      y,
      strafeChangeChance,
      speed: this.zombie.speed
    })
  }
}

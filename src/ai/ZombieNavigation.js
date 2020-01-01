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
    this.sightLine = new Phaser.Line()
  }

  followPlayer ({ strafeChangeChance, speed }) {
    this.followXY({
      x: this.player.world.x,
      y: this.player.world.y,
      top: this.player.top,
      bottom: this.player.bottom,
      left: this.player.left,
      right: this.player.right,
      strafeChangeChance,
      speed: speed || this.zombie.speed
    })
  }

  canZombieSeePlayer () {
    return this.canZombieSeeTarget(
      this.player.world.x,
      this.player.world.y,
      this.player.top,
      this.player.bottom,
      this.player.left,
      this.player.right
    )
  }

  canZombieSeeTarget (x, y, top, bottom, left, right) {
    const targetTop = top || y
    const targetBottom = bottom || y
    const targetLeft = left || x
    const targetRight = right || x

    this.sightLine.start.set(this.zombie.x, this.zombie.top)
    this.sightLine.end.set(x, targetTop)
    const topHits = this.game.layer.getRayCastTiles(this.sightLine)
    if (topHits.filter(x => x.index !== -1).length > 0) {
      return false
    }

    this.sightLine.start.set(this.zombie.x, this.zombie.bottom)
    this.sightLine.end.set(x, targetBottom)
    const bottomHits = this.game.layer.getRayCastTiles(this.sightLine)
    if (bottomHits.filter(x => x.index !== -1).length > 0) {
      return false
    }

    this.sightLine.start.set(this.zombie.left, this.zombie.y)
    this.sightLine.end.set(targetLeft, y)
    const leftHits = this.game.layer.getRayCastTiles(this.sightLine)
    if (leftHits.filter(x => x.index !== -1).length > 0) {
      return false
    }

    this.sightLine.start.set(this.zombie.right, this.zombie.y)
    this.sightLine.end.set(targetRight, y)
    const rightHits = this.game.layer.getRayCastTiles(this.sightLine)
    if (rightHits.filter(x => x.index !== -1).length > 0) {
      return false
    }

    return true
  }

  // Note that strafeChangeChance is actually back-to-front
  // When it's 1, there is no chance of strafing
  followXY ({ x, y, strafeChangeChance, speed, top, bottom, left, right }) {
    const zombieX = Math.floor(this.zombie.x / this.TILE_SIZE)
    const zombieY = Math.floor(this.zombie.y / this.TILE_SIZE)
    const followX = Math.floor(x / this.TILE_SIZE)
    const followY = Math.floor(y / this.TILE_SIZE)
    if (zombieX === followX && zombieY === followY) {
      this.goDirect(x, y, speed)
      return
    }

    if (this.canZombieSeeTarget(x, y, top, bottom, left, right)) {
      if (Math.random() > (strafeChangeChance || 0.99)) {
        this.strafeRight = !this.strafeRight
      }
      this.strafe(x, y, speed)
      return
    }

    if (this.processingPath) {
      return
    }

    this.pathfinder.findPath(zombieX, zombieY, followX, followY, (path) => {
      if (path === null || path.length <= 1 || !this.zombie || !this.zombie.body) {
        console.log('no path')
      } else {
        const { x, y } = path[1]
        const targetX = x * this.TILE_SIZE + 0.5 * this.TILE_SIZE
        const targetY = y * this.TILE_SIZE + 0.5 * this.TILE_SIZE
        this.goDirect(targetX, targetY, speed)
      }
      this.processingPath = false
    })
    this.processingPath = true
  }

  goDirect (x, y, speed) {
    this.game.physics.arcade.moveToObject(this.zombie, { x, y }, speed)
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

  wander ({ strafeChangeChance }) {
    if (!this.target || this.atTarget()) {
      this.target = this.mapPositionGenerator.getRandomPosition()
    }
    this.goTo({ x: this.target.x, y: this.target.y, strafeChangeChance })
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

import Phaser from 'phaser'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    const PLAYER_SIZE = 30
    const GUN_RANGE = 150
    const GUN_ANGLE = 60

    const playerGraphics = game.add.graphics(x, y)
    playerGraphics.beginFill(0xff0000, 1)
    playerGraphics.drawCircle(x, y, PLAYER_SIZE)
    playerGraphics.endFill()
    super(game, x, y, playerGraphics.generateTexture())

    this.gunAngleRadians = game.math.degToRad(GUN_ANGLE)
    this.NINETY_DEGREES_AS_RADIANS = game.math.degToRad(90)
    this.anchor.setTo(0.5)
    this.createFiringCone(GUN_RANGE)
    playerGraphics.destroy()
  }

  createFiringCone (gunRange) {
    const { x, y, game } = this
    const firingCone = game.add.graphics(x, y)
    firingCone.lineStyle(1, 0xff0000)
    firingCone.moveTo(x, y)
    firingCone.lineTo(x, y - gunRange)
    firingCone.moveTo(x, y)
    const rotatedAimLinePoint = Phaser.Point.rotate(
      new Phaser.Point(x, y - gunRange),
      x,
      y,
      this.gunAngleRadians
    )
    firingCone.lineTo(rotatedAimLinePoint.x, rotatedAimLinePoint.y)
    firingCone.endFill()
    this.firingCone = new Phaser.Sprite(
      game,
      0,
      0,
      firingCone.generateTexture()
    )
    this.firingCone.anchor.setTo(0, 1)
    this.addChild(this.firingCone)
    firingCone.destroy()
  }

  aimAt (x, y) {
    const { angleBetween } = this.game.math
    const aimAngle = angleBetween(this.world.x, this.world.y, x, y)
    this.firingCone.rotation =
      aimAngle + (this.NINETY_DEGREES_AS_RADIANS - 0.5 * this.gunAngleRadians)
  }

  move (direction, distance) {
    if (direction === UP) {
      this.body.velocity.setTo(0, -distance)
    } else if (direction === DOWN) {
      this.body.velocity.setTo(0, distance)
    } else if (direction === LEFT) {
      this.body.velocity.setTo(-distance, 0)
    } else if (direction === RIGHT) {
      this.body.velocity.setTo(distance, 0)
    }
  }

  update () {}
}

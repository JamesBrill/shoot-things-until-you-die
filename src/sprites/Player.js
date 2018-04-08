import Phaser from 'phaser'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'
import Shotgun from '../weapons/Shotgun'
import FiringCone from './FiringCone'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    const PLAYER_SIZE = 30
    const GUN_RANGE = 250
    const GUN_ANGLE = 30

    const playerGraphics = game.add.graphics(x, y)
    playerGraphics.beginFill(0xff0000, 1)
    playerGraphics.drawCircle(x, y, PLAYER_SIZE)
    playerGraphics.endFill()
    super(game, x, y, playerGraphics.generateTexture())

    this.shotgun = new Shotgun({ game, player: this })

    this.anchor.setTo(0.5)
    this.firingCone = new FiringCone({
      game,
      x,
      y,
      gunRange: GUN_RANGE,
      gunAngle: GUN_ANGLE
    })
    this.addChild(this.firingCone)
    playerGraphics.destroy()
  }

  aimAt (x, y) {
    const { angleBetween, radToDeg } = this.game.math
    const aimAngle = angleBetween(this.world.x, this.world.y, x, y)
    this.shotgun.fireAngle = radToDeg(aimAngle)
    this.firingCone.setAimAngle(aimAngle)
  }

  fire () {
    this.shotgun.fire()
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
}

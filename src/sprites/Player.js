import Phaser from 'phaser'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.aimLocation = { x, y }
    const aimLine = game.add.graphics(x, y)
    aimLine.lineStyle(1, 0xff0000)
    aimLine.moveTo(x, y)
    aimLine.lineTo(x, y - 150)
    aimLine.endFill()
    this.aimLine = new Phaser.Sprite(game, 0, 0, aimLine.generateTexture())
    this.addChild(this.aimLine)
    aimLine.destroy()
  }

  aimAt (x, y) {}

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

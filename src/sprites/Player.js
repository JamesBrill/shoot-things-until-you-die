import Phaser from 'phaser'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'
import Shotgun from '../weapons/Shotgun'

export default class Player extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    const playerGraphics = game.add.graphics(x, y)
    playerGraphics.beginFill(0xff0000, 1)
    playerGraphics.drawCircle(x, y, Player.PLAYER_SIZE)
    playerGraphics.endFill()
    super(game, x, y, playerGraphics.generateTexture())
    playerGraphics.destroy()
    this.anchor.setTo(0.5)

    this.shotgun = new Shotgun({ game, player: this })
    this.addChild(this.shotgun.firingCone)
  }

  aimAt (x, y) {
    this.shotgun.aimAt(x, y)
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

Player.PLAYER_SIZE = 30

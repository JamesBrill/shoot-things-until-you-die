import Phaser from 'phaser'
import { UP, DOWN, LEFT, RIGHT } from '../../constants/directions'

export default class Zombie extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    const enemyGraphics = game.add.graphics(x, y)
    enemyGraphics.beginFill(0x00ff00, 1)
    enemyGraphics.drawCircle(x, y, Zombie.ENEMY_SIZE)
    enemyGraphics.endFill()
    super(game, x, y, enemyGraphics.generateTexture())
    enemyGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
  }

  move (direction, distance) {
    if (direction === UP) {
      this.body.velocity.add(0, -distance)
    } else if (direction === DOWN) {
      this.body.velocity.add(0, distance)
    } else if (direction === LEFT) {
      this.body.velocity.add(-distance, 0)
    } else if (direction === RIGHT) {
      this.body.velocity.add(distance, 0)
    }
  }
}

Zombie.ENEMY_SIZE = 30

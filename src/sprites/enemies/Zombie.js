import Phaser from 'phaser'

export default class Zombie extends Phaser.Sprite {
  constructor ({ game, x, y, player, speed }) {
    const enemyGraphics = game.add.graphics(x, y)
    enemyGraphics.beginFill(0x00ff00, 1)
    enemyGraphics.drawCircle(x, y, Zombie.ENEMY_SIZE)
    enemyGraphics.endFill()
    super(game, x, y, enemyGraphics.generateTexture())
    enemyGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
    this.player = player
    this.speed = speed
  }

  move () {
    this.game.physics.arcade.moveToObject(this, this.player, this.speed)
  }
}

Zombie.ENEMY_SIZE = 30

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

Zombie.createRandom = (game, player, world, maxSpeed) => {
  const randomX = Math.random() * 10000 - 5000
  const randomY = Math.random() * 10000 - 5000
  const randomSpeed = Math.random() * (maxSpeed || 200) + 30
  return new Zombie({
    game,
    x: world.centerX + randomX,
    y: world.centerY + randomY,
    player,
    speed: randomSpeed
  })
}

Zombie.ENEMY_SIZE = 30

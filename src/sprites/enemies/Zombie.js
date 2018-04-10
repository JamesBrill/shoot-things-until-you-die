import Phaser from 'phaser'
import HealthBar from '../HealthBar'

export default class Zombie extends Phaser.Sprite {
  constructor ({ game, x, y, player, speed, size }) {
    const enemyGraphics = game.add.graphics(x, y)
    enemyGraphics.beginFill(0x00ff00, 1)
    enemyGraphics.drawCircle(x, y, size)
    enemyGraphics.endFill()
    super(game, x, y, enemyGraphics.generateTexture())
    enemyGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
    this.player = player
    this.sizeModifier = size / Zombie.NORMAL_SIZE
    this.speed = speed / this.sizeModifier
    this.attackDamage = 3
    this.maxHealth = 100 * this.sizeModifier
    this.health = this.maxHealth
    this.healthBar = new HealthBar({
      game,
      x: -0.5 * HealthBar.WIDTH,
      y: -size,
      maxHealth: this.maxHealth
    })
    this.addChild(this.healthBar)
  }

  move () {
    this.game.physics.arcade.moveToObject(this, this.player, this.speed)
  }

  takeDamage (weapon) {
    this.health -= weapon.attackDamage
    if (this.health <= 0) {
      this.kill()
      return true
    }
    this.healthBar.setHealth(this.health)
    return false
  }
}

Zombie.createRandom = (game, player, world, maxSpeed) => {
  const { width, height } = world
  const randomX = Math.random() * width - 0.5 * width
  const randomY = Math.random() * height - 0.5 * height
  const randomSpeed = Math.random() * (maxSpeed || 200) + 30
  const zombieSizePicker = Math.random()
  let zombieSize
  if (zombieSizePicker < 0.1) {
    zombieSize = Zombie.XLARGE_SIZE
  } else if (zombieSizePicker < 0.8) {
    zombieSize = Zombie.LARGE_SIZE
  } else {
    zombieSize = Zombie.NORMAL_SIZE
  }
  return new Zombie({
    game,
    x: world.centerX + randomX,
    y: world.centerY + randomY,
    player,
    speed: randomSpeed,
    size: zombieSize
  })
}

Zombie.NORMAL_SIZE = 30
Zombie.LARGE_SIZE = 60
Zombie.XLARGE_SIZE = 90

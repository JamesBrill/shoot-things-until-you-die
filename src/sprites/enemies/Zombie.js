import Phaser from 'phaser'
import HealthBar from '../HealthBar'

export default class Zombie extends Phaser.Sprite {
  constructor ({ game, x, y, player, speed, size, healthMultiplier }) {
    const enemyGraphics = game.add.graphics(x, y)
    enemyGraphics.beginFill(0x00ff00, 1)
    enemyGraphics.drawCircle(x, y, size)
    enemyGraphics.endFill()
    super(game, x, y, enemyGraphics.generateTexture())
    enemyGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
    this.player = player
    this.damageModifier = size / Zombie.NORMAL_SIZE
    this.sizeModifier =
      this.damageModifier + (size - Zombie.NORMAL_SIZE) / Zombie.NORMAL_SIZE
    this.speed = speed
    this.attackDamage = 3 * this.damageModifier
    this.maxHealth = 100 * this.sizeModifier * (healthMultiplier || 1)
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
      return true
    }
    this.healthBar.setHealth(this.health)
    return false
  }
}

Zombie.createRandom = (
  game,
  randomPosition,
  player,
  world,
  maxSpeed,
  healthMultiplier
) => {
  const { x, y } = randomPosition
  const randomSpeed = Math.random() * (maxSpeed || 200) + 30
  const zombieSizePicker = Math.random()
  let zombieSize
  if (zombieSizePicker < 0.05) {
    zombieSize = Zombie.XLARGE_SIZE
  } else if (zombieSizePicker < 0.15) {
    zombieSize = Zombie.LARGE_SIZE
  } else {
    zombieSize = Zombie.NORMAL_SIZE
  }
  return new Zombie({
    game,
    x,
    y,
    player,
    speed: randomSpeed,
    size: zombieSize,
    healthMultiplier
  })
}

Zombie.NORMAL_SIZE = 30
Zombie.LARGE_SIZE = 60
Zombie.XLARGE_SIZE = 120

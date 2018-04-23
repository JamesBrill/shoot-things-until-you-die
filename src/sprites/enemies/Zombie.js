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
    this.size = size
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
      y: -(0.7 * size + 10),
      maxHealth: this.maxHealth
    })
    this.addChild(this.healthBar)

    this.nameText = this.game.add.text(0, 0, Zombie.getEnemyName(size), {
      font: `${size === Zombie.XLARGE_SIZE ? 18 : 14}px Arial`,
      fill: 'black',
      boundsAlignH: 'center'
    })
    this.nameText.bringToTop()
    Zombie.setTextBounds(this.nameText, size)
    this.addChild(this.nameText)
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

const normalTasks = [
  'Put TVs in meeting rooms',
  'Fireside chat',
  'Arrange tech talk',
  'Buy lunch'
]
const largeTasks = ['Fix the f***ing Wi-Fi', 'Empty email inbox']

Zombie.getEnemyName = function (enemySize) {
  if (enemySize === Zombie.XLARGE_SIZE) {
    return largeTasks[Math.floor(Math.random() * largeTasks.length)]
  }
  return normalTasks[Math.floor(Math.random() * normalTasks.length)]
}

Zombie.setTextBounds = function (nameText, enemySize) {
  if (enemySize === Zombie.XLARGE_SIZE) {
    nameText.setTextBounds(-50, -115, 100, 100)
  } else if (enemySize === Zombie.LARGE_SIZE) {
    nameText.setTextBounds(-50, -70, 100, 100)
  } else {
    nameText.setTextBounds(-50, -50, 100, 100)
  }
}

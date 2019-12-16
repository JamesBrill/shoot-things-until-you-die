import Phaser from 'phaser'
import HealthBar from '../HealthBar'

export default class Zombie extends Phaser.Sprite {
  constructor ({ game, x, y, player, speed, size, health, colour }) {
    const enemyGraphics = game.add.graphics(x, y)
    enemyGraphics.beginFill(colour, 1)
    enemyGraphics.drawCircle(x, y, size)
    enemyGraphics.endFill()
    super(game, x, y, enemyGraphics.generateTexture())
    enemyGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
    this.layer = this.game.layer
    this.size = size
    this.player = player
    this.damageModifier = size / Zombie.NORMAL_SIZE
    this.sizeModifier =
      this.damageModifier + (size - Zombie.NORMAL_SIZE) / Zombie.NORMAL_SIZE
    this.speed = speed
    this.attackDamage = 3 * this.damageModifier
    this.maxHealth = health
    this.health = this.maxHealth
    this.healthBar = new HealthBar({
      game,
      x: -0.5 * HealthBar.WIDTH,
      y: -(0.7 * size + 10),
      maxHealth: this.maxHealth
    })
    this.addChild(this.healthBar)
  }

  takeDamage (weapon) {
    this.health -= weapon.attackDamage
    if (this.health <= 0) {
      return true
    }
    this.healthBar.setHealth(this.health)
    return false
  }

  hitWallCallback (bullet) {
    bullet.kill()
  }

  handlePlayerShot (player, bullet) {
    this.weapon.hitTarget(bullet)
    this.handlePlayerDamage(player, this.weapon)
  }

  handlePlayerDamage (player, damageSource) {
    player.takeDamage(damageSource)
  }

  update () {
    if (this.weapon) {
      this.game.physics.arcade.collide(
        this.weapon.bullets,
        this.layer,
        this.hitWallCallback,
        null,
        this
      )

      this.game.physics.arcade.overlap(
        this.weapon.bullets,
        this.player,
        this.handlePlayerShot,
        null,
        this
      )
    }
    this.game.physics.arcade.collide(
      this.player,
      this,
      this.handlePlayerDamage,
      null,
      this
    )
  }
}

Zombie.NORMAL_SIZE = 30
Zombie.LARGE_SIZE = 60
Zombie.XLARGE_SIZE = 120

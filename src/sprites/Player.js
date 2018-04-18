import Phaser from 'phaser'
import HealthBar from './HealthBar'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class Player extends Phaser.Sprite {
  constructor ({ game, x, y, weapon }) {
    const playerGraphics = game.add.graphics(x, y)
    playerGraphics.beginFill(0x000000, 1)
    playerGraphics.drawCircle(x, y, Player.PLAYER_SIZE)
    playerGraphics.endFill()
    super(game, x, y, playerGraphics.generateTexture())
    playerGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
    this.armWeapon(weapon)
    this.health = 250
    this.healthBar = new HealthBar({
      game,
      x: -0.5 * HealthBar.WIDTH,
      y: -Player.PLAYER_SIZE,
      maxHealth: this.health
    })
    this.addChild(this.healthBar)
  }

  takeDamage (enemy) {
    this.health -= enemy.attackDamage
    if (this.health <= 0) {
      this.kill()
      return true
    }
    this.healthBar.setHealth(this.health)
    return false
  }

  aimAt (x, y) {
    this.weapon.aimAt(x, y)
  }

  fire () {
    this.weapon.fire()
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

  armWeapon (weapon) {
    if (this.weapon) {
      this.weapon.disarm()
      this.removeChild(this.weapon.firingCone)
    }
    this.weapon = weapon
    weapon.arm(this)
    this.addChild(this.weapon.firingCone)
  }
}

Player.PLAYER_SIZE = 30

import Phaser from 'phaser'
import HealthBar from './HealthBar'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class Player extends Phaser.Sprite {
  constructor ({ game, x, y, weapon, bloodManager, onHitEnemy, enemies }) {
    const playerGraphics = game.add.graphics(x, y)
    playerGraphics.beginFill(0x000000, 1)
    playerGraphics.drawCircle(x, y, Player.PLAYER_SIZE)
    playerGraphics.endFill()
    super(game, x, y, playerGraphics.generateTexture())
    playerGraphics.destroy()
    this.anchor.setTo(0.5)
    this.game = game
    this.layer = this.game.layer
    this.bloodManager = bloodManager
    this.onHitEnemy = onHitEnemy
    this.enemies = enemies
    this.armWeapon(weapon)
    this.health = 250
    this.maxHealth = this.health
    this.healthBar = new HealthBar({
      game,
      x: -0.5 * HealthBar.WIDTH,
      y: -Player.PLAYER_SIZE,
      maxHealth: this.health
    })
    this.size = Player.PLAYER_SIZE
    this.addChild(this.healthBar)
  }

  takeDamage (enemy) {
    this.health -= enemy.attackDamage
    if (this.health <= 0) {
      this.kill()
      return true
    }
    if (this.health <= this.maxHealth * 0.5) {
      const intensity = (0.5 - (this.health / this.maxHealth)) * 1800
      this.bloodManager.updatePlayerBloodDrip(this, intensity)
    }
    this.healthBar.setHealth(this.health)
    return false
  }

  receiveHealth (health) {
    this.health = Math.min(this.maxHealth, this.health + health)
    this.healthBar.setHealth(this.health)
    if (this.health > this.maxHealth * 0.5) {
      this.bloodManager.stopPlayerBloodDrip()
    } else {
      const intensity = (0.5 - (this.health / this.maxHealth)) * 1800
      this.bloodManager.updatePlayerBloodDrip(this, intensity)
    }
  }

  aimAt (x, y) {
    this.weapon.aimAt(x, y)
  }

  fire () {
    this.weapon.fire()
  }

  move (direction, distance, speedUp) {
    this.removeChild(this.weapon.firingCone)
    if (speedUp) {
      this.weapon.dash()
    } else {
      this.weapon.walk()
    }
    this.addChild(this.weapon.firingCone)
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

  stopMoving () {
    this.removeChild(this.weapon.firingCone)
    this.weapon.stand()
    this.addChild(this.weapon.firingCone)
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

  isDead () {
    return this.health <= 0
  }

  hitWallCallback (bullet) {
    bullet.kill()
  }

  update () {
    this.game.physics.arcade.collide(this, this.layer)

    if (!this.weapon.isGhost) {
      this.game.physics.arcade.collide(
        this.weapon.bullets,
        this.layer,
        this.hitWallCallback,
        null,
        this
      )
    }

    this.game.physics.arcade.overlap(
      this.weapon.bullets,
      this.enemies,
      this.onHitEnemy,
      null,
      this
    )
  }
}

Player.PLAYER_SIZE = 30

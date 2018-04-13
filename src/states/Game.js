/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Zombie from '../sprites/enemies/Zombie'
import Pistol from '../weapons/Pistol'
import LeverActionShotgun from '../weapons/LeverActionShotgun'
import SemiAutoShotgun from '../weapons/SemiAutoShotgun'
import AssaultRifle from '../weapons/AssaultRifle'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.world.setBounds(-10000, -10000, 20000, 20000)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.weapons = [
      new Pistol({ game: this.game }),
      new LeverActionShotgun({ game: this.game }),
      new SemiAutoShotgun({ game: this.game }),
      new AssaultRifle({ game: this.game })
    ]

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      weapon: this.weapons[0]
    })
    this.game.add.existing(this.player)
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true

    this.enemies = this.game.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE
    this.maxZombieSpeed = 200
    this.healthMultiplier = 1

    for (let i = 0; i < 100; i++) {
      this.enemies.add(
        Zombie.createRandom(
          this.game,
          this.player,
          this.world,
          this.maxZombieSpeed
        )
      )
    }

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      reload: this.game.input.keyboard.addKey(Phaser.Keyboard.R),
      weaponOne: this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
      weaponTwo: this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
      weaponThree: this.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
      weaponFour: this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
    }

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
  }

  hitCallback (bullet, enemy) {
    this.player.weapon.hitTarget(bullet)
    const isEnemyKilled = enemy.takeDamage(this.player.weapon)
    if (isEnemyKilled) {
      this.enemies.removeChild(enemy)
      this.maxZombieSpeed = Math.min(this.maxZombieSpeed + 1, 270)
      this.healthMultiplier += 0.001
      this.enemies.add(
        Zombie.createRandom(
          this.game,
          this.player,
          this.world,
          this.maxZombieSpeed,
          this.healthMultiplier
        )
      )
    }
  }

  handlePlayerDamage (player, enemy) {
    const isPlayerKilled = player.takeDamage(enemy)
    if (isPlayerKilled) {
      this.game.paused = true
    }
  }

  update () {
    this.game.physics.arcade.overlap(
      this.player.weapon.bullets,
      this.enemies,
      this.hitCallback,
      null,
      this
    )
    this.game.physics.arcade.collide(
      this.enemies,
      this.enemies,
      null,
      null,
      this
    )
    this.game.physics.arcade.collide(
      this.player,
      this.enemies,
      this.handlePlayerDamage,
      null,
      this
    )

    this.enemies.forEach(enemy => enemy.move())

    this.player.body.velocity.setTo(0, 0)
    const { worldX, worldY } = this.game.input.mousePointer
    this.player.aimAt(worldX, worldY)
    if (this.cursors.up.isDown) {
      this.player.move(UP, 300)
    } else if (this.cursors.down.isDown) {
      this.player.move(DOWN, 300)
    }

    if (this.cursors.left.isDown) {
      this.player.move(LEFT, 300)
    } else if (this.cursors.right.isDown) {
      this.player.move(RIGHT, 300)
    }

    if (this.cursors.weaponOne.isDown) {
      this.player.armWeapon(this.weapons[0])
    } else if (this.cursors.weaponTwo.isDown) {
      this.player.armWeapon(this.weapons[1])
    } else if (this.cursors.weaponThree.isDown) {
      this.player.armWeapon(this.weapons[2])
    } else if (this.cursors.weaponFour.isDown) {
      this.player.armWeapon(this.weapons[3])
    }

    if (this.cursors.reload.isDown) {
      this.player.weapon.reload()
    }

    if (this.game.input.mousePointer.isDown) {
      this.player.fire()
      Pistol.disableFiring()
    } else {
      Pistol.enableFiring()
    }
  }

  render () {}
}

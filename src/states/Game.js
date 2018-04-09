/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Zombie from '../sprites/enemies/Zombie'
import LeverActionShotgun from '../weapons/LeverActionShotgun'
import SemiAutoShotgun from '../weapons/SemiAutoShotgun'
import AssaultRifle from '../weapons/AssaultRifle'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.world.setBounds(-1000000, -1000000, 2000000, 2000000)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.weapons = [
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

    this.enemies = this.game.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE

    for (let i = 0; i < 100; i++) {
      const randomX = Math.random() * 10000 - 5000
      const randomY = Math.random() * 10000 - 5000
      const randomSpeed = Math.random() * 200 + 30
      this.enemies.add(
        new Zombie({
          game: this.game,
          x: this.world.centerX + randomX,
          y: this.world.centerY + randomY,
          player: this.player,
          speed: randomSpeed
        })
      )
    }

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      weaponOne: this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
      weaponTwo: this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
      weaponThree: this.game.input.keyboard.addKey(Phaser.Keyboard.THREE)
    }

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
  }

  hitCallback (bullet, enemy) {
    bullet.kill()
    enemy.kill()
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
      () => this.player.kill(),
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
    }

    if (this.game.input.mousePointer.isDown) {
      this.player.fire()
    }
  }

  render () {}
}

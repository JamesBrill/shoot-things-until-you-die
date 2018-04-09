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

    this.enemies = [
      new Zombie({
        game: this.game,
        x: this.world.centerX + 200,
        y: this.world.centerY + 200
      })
    ]

    for (let i = 0; i < this.enemies.length; i++) {
      this.game.add.existing(this.enemies[i])
      this.game.physics.arcade.enable(this.enemies[i])
    }

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      weapon: this.weapons[0]
    })
    this.game.add.existing(this.player)
    this.game.physics.arcade.enable(this.player)

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

  update () {
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

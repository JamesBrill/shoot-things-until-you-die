/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.world.setBounds(-1000000, -1000000, 2000000, 2000000)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY
    })
    this.game.add.existing(this.player)
    this.game.physics.arcade.enable(this.player)

    this.player.body.fixedRotation = true

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
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
  }

  render () {}
}

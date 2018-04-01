/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.add.tileSprite(0, 0, 1920, 1920, 'background')

    this.game.world.setBounds(0, 0, 1920, 1920)

    this.game.physics.startSystem(Phaser.Physics.P2JS)

    this.player = new Mushroom({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })
    this.game.add.existing(this.player)
    this.game.physics.p2.enable(this.player)

    this.player.body.fixedRotation = true

    this.cursors = this.game.input.keyboard.createCursorKeys()

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
  }

  update () {
    this.player.body.setZeroVelocity()

    if (this.cursors.up.isDown) {
      this.player.body.moveUp(300)
    } else if (this.cursors.down.isDown) {
      this.player.body.moveDown(300)
    }

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -300
    } else if (this.cursors.right.isDown) {
      this.player.body.moveRight(300)
    }
  }

  render () {}
}

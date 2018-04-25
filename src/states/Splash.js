import Phaser from 'phaser'

export default class extends Phaser.State {
  create () {
    const splashImage = this.game.add.sprite(0, 0, 'splash')
    splashImage.height = window.innerHeight
    splashImage.width = splashImage.height
    splashImage.x = (window.innerWidth - splashImage.width) / 2
  }

  render () {
    if (this.game.input.mousePointer.isDown) {
      this.state.start('Game')
    }
  }
}

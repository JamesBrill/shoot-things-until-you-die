import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBg'
    )
    this.loaderBar = this.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      'loaderBar'
    )
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.audio(
      'semi_auto_shotgun_fire',
      'assets/audio/sound_effects/semi_auto_shotgun_fire.wav'
    )
    this.load.audio(
      'lever_action_shotgun_fire',
      'assets/audio/sound_effects/lever_action_shotgun_fire.wav'
    )
  }

  create () {
    this.state.start('Game')
  }
}

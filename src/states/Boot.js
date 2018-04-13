import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    if (config.webfonts.length) {
      WebFont.load({
        google: {
          families: config.webfonts
        },
        active: this.fontsLoaded
      })
    }

    let text = this.add.text(
      this.world.centerX,
      this.world.centerY,
      'loading fonts',
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    )
    text.anchor.setTo(0.5, 0.5)

    this.load.audio(
      'semi_auto_shotgun_fire',
      'assets/audio/sound_effects/semi_auto_shotgun_fire.wav'
    )
    this.load.audio(
      'lever_action_shotgun_fire',
      'assets/audio/sound_effects/lever_action_shotgun_fire.wav'
    )
    this.load.audio(
      'assault_rifle_fire',
      'assets/audio/sound_effects/assault_rifle_fire.wav'
    )
    this.load.audio(
      'assault_rifle_reload',
      'assets/audio/sound_effects/assault_rifle_reload.wav'
    )
    this.load.audio(
      'lever_action_shotgun_load',
      'assets/audio/sound_effects/lever_action_shotgun_load.wav'
    )
    this.load.audio(
      'lever_action_shotgun_cock',
      'assets/audio/sound_effects/lever_action_shotgun_cock.wav'
    )
    this.load.audio(
      'semi_auto_shotgun_load',
      'assets/audio/sound_effects/semi_auto_shotgun_load.wav'
    )
    this.load.audio(
      'semi_auto_shotgun_cock',
      'assets/audio/sound_effects/semi_auto_shotgun_cock.wav'
    )
    this.load.audio('dry_fire', 'assets/audio/sound_effects/dry_fire.wav')
  }

  render () {
    if (config.webfonts.length && this.fontsReady) {
      this.state.start('Game')
    }
    if (!config.webfonts.length) {
      this.state.start('Game')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}

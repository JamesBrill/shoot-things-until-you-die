import Phaser from 'phaser'

export default class MomentumMeter extends Phaser.Sprite {
  constructor ({ game }) {
    const momentumMeter = game.add.graphics(0, 0)
    momentumMeter.lineStyle(1, 0x000000)
    momentumMeter.lineTo(0, MomentumMeter.HEIGHT)
    momentumMeter.lineTo(MomentumMeter.WIDTH, MomentumMeter.HEIGHT)
    momentumMeter.lineTo(MomentumMeter.WIDTH, 0)
    momentumMeter.lineTo(0, 0)
    super(
      game,
      window.innerWidth - 80,
      window.innerHeight - 150,
      momentumMeter.generateTexture()
    )
    this.game = game
    this.maxMomentum = 100
    this.momentum = this.maxMomentum
    momentumMeter.destroy()
    this.setMomentum(this.maxMomentum)
    this.fixedToCamera = true
    this.reduceMomentum()
  }

  reduceMomentum () {
    if (this.momentum > 0) {
      this.setMomentum(this.momentum - 1)
    }
    setTimeout(this.reduceMomentum.bind(this), 1000)
  }

  increaseMomentum () {
    if (this.momentum < this.maxMomentum) {
      this.setMomentum(Math.min(this.momentum + 1, this.maxMomentum))
    }
  }

  getMomentumMeterColour (momentum) {
    if (momentum > 2 / 3 * this.maxMomentum) {
      return 0x00ff00
    } else if (momentum > 1 / 3 * this.maxMomentum) {
      return 0xffff00
    } else {
      return 0xff0000
    }
  }

  setMomentum (momentum) {
    this.momentum = momentum
    const momentumMeterColour = this.getMomentumMeterColour(momentum)
    const momentumContentsHeight =
      MomentumMeter.HEIGHT * (momentum / this.maxMomentum)
    this.removeChild(this.momentumMeterContents)
    const momentumMeterContents = this.game.add.graphics(0, 0)
    momentumMeterContents.beginFill(momentumMeterColour)
    momentumMeterContents.moveTo(0, 0)
    momentumMeterContents.lineTo(
      0,
      MomentumMeter.HEIGHT - momentumContentsHeight
    )
    momentumMeterContents.lineTo(
      MomentumMeter.WIDTH,
      MomentumMeter.HEIGHT - momentumContentsHeight
    )
    momentumMeterContents.lineTo(MomentumMeter.WIDTH, MomentumMeter.HEIGHT)
    momentumMeterContents.lineTo(0, MomentumMeter.HEIGHT)
    momentumMeterContents.endFill()
    this.momentumMeterContents = new Phaser.Sprite(
      this.game,
      1,
      1,
      momentumMeterContents.generateTexture()
    )
    this.addChild(this.momentumMeterContents)
    momentumMeterContents.destroy()
  }
}

MomentumMeter.WIDTH = 30
MomentumMeter.HEIGHT = 100

import Phaser from 'phaser'

export default class BloodDrip extends Phaser.Sprite {
  constructor ({ game, player }) {
    const random = Math.floor(Math.random() * 3)
    let texture, size
    if (random === 0) {
      texture = BloodDrip.getBigTexture(game, player.size)
      size = player.size * BloodDrip.BIG_MULTIPLIER
    } else if (random === 1) {
      texture = BloodDrip.getMediumTexture(game, player.size)
      size = player.size * BloodDrip.MEDIUM_MULTIPLIER
    } else {
      texture = BloodDrip.getSmallTexture(game, player.size)
      size = player.size * BloodDrip.SMALL_MULTIPLIER
    }
    const x = player.world.x - 0.5 * size
    const y = player.world.y - 0.5 * size
    super(game, x, y, texture)
    const xAnchor = 0.5 * size / this.width
    const yAnchor = 0.5 * size / this.height
    this.anchor.setTo(xAnchor, yAnchor)
    this.x += 0.5 * size
    this.y += 0.5 * size
  }

  update () {
    this.alpha = Math.max(0, this.alpha - 0.005)
  }
}

BloodDrip.createTexture = (game, size) => {
  const bloodDrip = game.add.graphics(0, 0)
  bloodDrip.lineStyle(1, 0xff0000)
  bloodDrip.beginFill(0xff0000)
  bloodDrip.drawCircle(0, 0, size)
  bloodDrip.endFill()
  const texture = bloodDrip.generateTexture()
  bloodDrip.destroy()
  return texture
}

BloodDrip.getBigTexture = (game, playerSize) => {
  if (!BloodDrip.BIG_TEXTURE) {
    BloodDrip.BIG_TEXTURE = BloodDrip.createTexture(game, playerSize * BloodDrip.BIG_MULTIPLIER)
  }
  return BloodDrip.BIG_TEXTURE
}

BloodDrip.getMediumTexture = (game, playerSize) => {
  if (!BloodDrip.MEDIUM_TEXTURE) {
    BloodDrip.MEDIUM_TEXTURE = BloodDrip.createTexture(game, playerSize * BloodDrip.MEDIUM_MULTIPLIER)
  }
  return BloodDrip.MEDIUM_TEXTURE
}

BloodDrip.getSmallTexture = (game, playerSize) => {
  if (!BloodDrip.SMALL_TEXTURE) {
    BloodDrip.SMALL_TEXTURE = BloodDrip.createTexture(game, playerSize * BloodDrip.SMALL_MULTIPLIER)
  }
  return BloodDrip.SMALL_TEXTURE
}

BloodDrip.BIG_TEXTURE = null
BloodDrip.MEDIUM_TEXTURE = null
BloodDrip.SMALL_TEXTURE = null
BloodDrip.BIG_MULTIPLIER = 0.9
BloodDrip.MEDIUM_MULTIPLIER = 0.7
BloodDrip.SMALL_MULTIPLIER = 0.5

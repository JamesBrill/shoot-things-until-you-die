import Phaser from 'phaser'

export default class BloodDrip extends Phaser.Sprite {
  constructor ({ game, player }) {
    const size = Math.max(Math.random(), 0.3) * player.size
    const x = player.world.x - 0.5 * player.size
    const y = player.world.y - 0.5 * player.size
    const bloodDrip = game.add.graphics(x, y)
    bloodDrip.lineStyle(1, 0xff0000)
    bloodDrip.beginFill(0xff0000)
    bloodDrip.drawCircle(0, 0, size)
    bloodDrip.endFill()
    super(game, x, y, bloodDrip.generateTexture())
    bloodDrip.destroy()
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

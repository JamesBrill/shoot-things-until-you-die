import Phaser from 'phaser'

export default class BloodSplatter extends Phaser.Sprite {
  constructor ({ game, enemy, size, angle }) {
    const x = enemy.x - 0.5 * enemy.size
    const y = enemy.y - 0.5 * enemy.size
    const bloodSplatter = game.add.graphics(x, y)
    bloodSplatter.lineStyle(1, 0xff0000)
    bloodSplatter.beginFill(0xff0000)
    bloodSplatter.drawCircle(0, 0, size)
    const numberOfBloodSpikes = size / 2
    for (let i = 0; i < numberOfBloodSpikes; i++) {
      BloodSplatter.drawBloodSpike(bloodSplatter, size)
    }
    bloodSplatter.endFill()
    super(game, x, y, bloodSplatter.generateTexture())
    bloodSplatter.destroy()
    const xAnchor = 0.5 * size / this.width
    const yAnchor = 0.5 * size / this.height
    this.anchor.setTo(xAnchor, yAnchor)
    this.x += 0.5 * size
    this.y += 0.5 * size
    this.angle = angle
  }

  update () {
    this.alpha = Math.max(0, this.alpha - 0.0005)
    if (this.alpha < 0.1) {
      this.destroy()
    }
  }
}

BloodSplatter.drawBloodSpike = (graphics, size) => {
  const randomAngle = Math.random() * 90 - 90
  const randomLength = Math.random() * size * 5
  const randomWidth = Math.random() * (size / 10) + 10
  graphics.moveTo(0, 0)
  const rotatedPoint = Phaser.Point.rotate(
    new Phaser.Point(10, randomLength),
    0,
    0,
    randomAngle,
    true
  )
  const rotatedPoint2 = Phaser.Point.rotate(
    new Phaser.Point(randomWidth, 0),
    0,
    0,
    randomAngle,
    true
  )
  graphics.bezierCurveTo(
    0,
    0,
    rotatedPoint.x,
    rotatedPoint.y,
    rotatedPoint2.x,
    rotatedPoint2.y
  )
}

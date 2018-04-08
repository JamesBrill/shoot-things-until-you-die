import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, gunRange, gunAngle }) {
    const gunAngleRadians = game.math.degToRad(gunAngle)
    const firingCone = game.add.graphics(x, y)
    firingCone.lineStyle(1, 0xff0000)
    firingCone.moveTo(x, y)
    firingCone.lineTo(x, y - gunRange)
    firingCone.moveTo(x, y)
    const rotatedAimLinePoint = Phaser.Point.rotate(
      new Phaser.Point(x, y - gunRange),
      x,
      y,
      gunAngleRadians
    )
    firingCone.lineTo(rotatedAimLinePoint.x, rotatedAimLinePoint.y)
    firingCone.endFill()
    super(game, x, y, firingCone.generateTexture())
    this.NINETY_DEGREES_AS_RADIANS = game.math.degToRad(90)
    this.gunAngleRadians = gunAngleRadians

    this.anchor.setTo(0, 1)
    firingCone.destroy()
  }

  setAimAngle (aimAngle) {
    this.rotation =
      aimAngle + (this.NINETY_DEGREES_AS_RADIANS - 0.5 * this.gunAngleRadians)
  }

  update () {}
}

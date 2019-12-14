import BloodSplatter from '../sprites/BloodSplatter'

export default class BloodManager {
  constructor ({ game, player }) {
    this.game = game
    this.player = player
    this.bloodSplatters = this.game.add.group()
  }

  createBloodSplatter (enemy) {
    const { angleBetween, radToDeg } = this.game.math
    const bloodSplatter = new BloodSplatter({
      game: this.game,
      enemy,
      size: enemy.size,
      angle:
          radToDeg(
            angleBetween(this.player.x, this.player.y, enemy.x, enemy.y)
          ) - 45
    })
    this.bloodSplatters.add(bloodSplatter)
    if (this.bloodSplatters.children.length > 100) {
      const firstBloodSplatter = this.bloodSplatters.children[0]
      this.bloodSplatters.remove(firstBloodSplatter)
    }
  }
}

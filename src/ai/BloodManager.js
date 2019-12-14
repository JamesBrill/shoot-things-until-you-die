import BloodSplatter from '../sprites/BloodSplatter'
import BloodDrip from '../sprites/BloodDrip'

export default class BloodManager {
  constructor ({ game }) {
    this.game = game
    this.bloodSplatters = this.game.add.group()
    this.bloodDrips = this.game.add.group()
    this.bloodDripInterval = null
  }

  createBloodSplatter (enemy, player) {
    const { angleBetween, radToDeg } = this.game.math
    const bloodSplatter = new BloodSplatter({
      game: this.game,
      enemy,
      size: enemy.size,
      angle:
          radToDeg(
            angleBetween(player.x, player.y, enemy.x, enemy.y)
          ) - 45
    })
    this.bloodSplatters.add(bloodSplatter)
    if (this.bloodSplatters.children.length > 100) {
      const firstBloodSplatter = this.bloodSplatters.children[0]
      this.bloodSplatters.remove(firstBloodSplatter)
    }
  }

  createBloodDrip (player) {
    const bloodDrip = new BloodDrip({ game: this.game, player })
    this.bloodDrips.add(bloodDrip)
    if (this.bloodDrips.children.length > 50) {
      const firstBloodDrip = this.bloodDrips.children[0]
      this.bloodDrips.remove(firstBloodDrip)
    }
  }

  updatePlayerBloodDrip (player, intensity) {
    if (this.bloodDripInterval) {
      this.stopPlayerBloodDrip()
    }
    this.bloodDripInterval = setInterval(() => this.createBloodDrip(player), 1000 - intensity)
  }

  stopPlayerBloodDrip () {
    if (this.bloodDripInterval) {
      clearInterval(this.bloodDripInterval)
      this.bloodDripInterval = null
    }
  }
}

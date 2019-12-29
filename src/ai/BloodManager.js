import BloodSplatter from '../sprites/BloodSplatter'
import BloodDrip from '../sprites/BloodDrip'

export default class BloodManager {
  constructor ({ game }) {
    this.game = game
    this.bloodSplatters = this.game.add.group()
    this.bloodSplatters.enableBody = true
    this.game.world.sendToBack(this.bloodSplatters)
    this.bloodDrips = this.game.add.group()
    this.bloodDrips.enableBody = true
    this.bloodDripInterval = null
    this.game.world.sendToBack(this.bloodDrips)
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

  getNearestBloodSplatter (x, y) {
    let shortestDistance = Infinity
    let nearestBloodSplatter
    for (let i = 0; i < this.bloodSplatters.children.length; i++) {
      const bloodSplatter = this.bloodSplatters.children[i]
      const distanceToBloodSplatter = Math.sqrt(
        (bloodSplatter.centerX - x) ** 2 + (bloodSplatter.centerY - y) ** 2
      )
      if (distanceToBloodSplatter < shortestDistance) {
        nearestBloodSplatter = bloodSplatter
        shortestDistance = distanceToBloodSplatter
      }
    }
    return nearestBloodSplatter
  }

  reset () {
    this.stopPlayerBloodDrip()
  }
}

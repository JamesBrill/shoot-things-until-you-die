import ColourEnemy from '../sprites/enemies/ColourEnemy'
import {
  getRandomSpawnPointAwayFromPlayer,
  getTopLeftSpawnPoint,
  getTopRightSpawnPoint,
  getBottomLeftSpawnPoint,
  getBottomRightSpawnPoint
} from '../utils/world'

export default class Director {
  constructor ({ game, player, enemies, pathfinder, bloodManager }) {
    this.game = game
    this.player = player
    this.enemies = enemies
    this.pathfinder = pathfinder
    this.bloodManager = bloodManager
    this.healthMultiplier = 1
    this.speedMultiplier = 1
    this.difficulty = 1
    this.addZombieInterval = setInterval(this.addZombie.bind(this), 20000)
  }

  initialiseZombies () {
    this.addRandomZombie(getTopLeftSpawnPoint({ game: this.game }))
    this.addRandomZombie(getTopRightSpawnPoint({ game: this.game }))
    this.addRandomZombie(getBottomLeftSpawnPoint({ game: this.game }))
    this.addRandomZombie(getBottomRightSpawnPoint({ game: this.game }))
  }

  replaceZombie (enemy, increaseZombieHealth) {
    this.enemies.remove(enemy, true)
    if (increaseZombieHealth) {
      this.healthMultiplier += 0.001
      this.speedMultiplier += 0.001
      this.difficulty += 1
    }
    this.addZombie()
  }

  addZombie () {
    if (this.enemies.length >= Director.MAX_ZOMBIES) {
      return
    }
    const spawnPoint = getRandomSpawnPointAwayFromPlayer({ game: this.game, player: this.player })
    this.addRandomZombie(spawnPoint)
  }

  addRandomZombie (spawnPoint) {
    const { x, y } = spawnPoint
    const colour = Math.random() > 0.5 ? 0xff0000 : 0x0000ff
    const zombie = new ColourEnemy({
      game: this.game,
      x,
      y,
      player: this.player,
      speedMultiplier: this.speedMultiplier,
      healthMultiplier: this.healthMultiplier,
      pathfinder: this.pathfinder,
      enemies: this.enemies,
      colour
    })
    this.enemies.add(zombie)
  }

  reset () {
    clearInterval(this.addZombieInterval)
  }
}

Director.MAX_ZOMBIES = 100

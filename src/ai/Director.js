import SoldierZombie from '../sprites/enemies/SoldierZombie'
import ChaserZombie from '../sprites/enemies/ChaserZombie'
import BossZombie from '../sprites/enemies/BossZombie'
import FodderZombie from '../sprites/enemies/FodderZombie'
import BloodZombie from '../sprites/enemies/BloodZombie'
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
    this.zombieProbabilities = {}
    this.adjustZombieProbabilities()
    this.calculateZombieProbabilityThresholds()
    setInterval(this.addZombie.bind(this), 20000)
  }

  initialiseZombies () {
    this.addRandomZombie(getTopLeftSpawnPoint({ game: this.game }))
    this.addRandomZombie(getTopRightSpawnPoint({ game: this.game }))
    this.addRandomZombie(getBottomLeftSpawnPoint({ game: this.game }))
    this.addRandomZombie(getBottomRightSpawnPoint({ game: this.game }))
  }

  adjustZombieProbabilities () {
    this.zombieProbabilities.fodder = Math.max(100 - this.difficulty * 0.05, 10)
    this.zombieProbabilities.chaser = Math.min(this.difficulty * 0.05, 34)
    this.zombieProbabilities.soldier = Math.min(this.difficulty * 0.025, 34)
    this.zombieProbabilities.blood = Math.min(this.difficulty * 0.025, 20)
    this.zombieProbabilities.boss = Math.min(this.difficulty * 0.001, 2)
    const totalProbability = Object.values(this.zombieProbabilities).reduce((x, y) => x + y)
    const probabilityDrift = 100 - totalProbability
    this.zombieProbabilities.fodder += probabilityDrift
  }

  calculateZombieProbabilityThresholds () {
    this.zombiesProbabilityThresholds = []
    let threshold = 0
    const zombieNames = Object.keys(this.zombieProbabilities)
    for (let i = 0; i < zombieNames.length; i++) {
      const zombieName = zombieNames[i]
      threshold += this.zombieProbabilities[zombieName]
      this.zombiesProbabilityThresholds.push({ threshold, zombieName })
    }
  }

  replaceZombie (enemy, increaseZombieHealth) {
    this.enemies.remove(enemy, true)
    if (increaseZombieHealth) {
      this.healthMultiplier += 0.001
      this.speedMultiplier += 0.001
      this.difficulty += 1
      this.adjustZombieProbabilities()
      this.calculateZombieProbabilityThresholds()
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

  addZombieByName (zombieName, x, y) {
    let zombie, immovable
    if (zombieName === 'soldier') {
      zombie = new SoldierZombie({
        game: this.game,
        x,
        y,
        player: this.player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else if (zombieName === 'fodder') {
      zombie = new FodderZombie({
        game: this.game,
        x,
        y,
        player: this.player,
        speedMultiplier: this.speedMultiplier,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else if (zombieName === 'chaser') {
      zombie = new ChaserZombie({
        game: this.game,
        x,
        y,
        player: this.player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else if (zombieName === 'boss') {
      zombie = new BossZombie({
        game: this.game,
        x,
        y,
        player: this.player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else if (zombieName === 'blood') {
      zombie = new BloodZombie({
        game: this.game,
        x,
        y,
        player: this.player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder,
        bloodManager: this.bloodManager
      })
      immovable = false
    }
    if (zombie) {
      this.enemies.add(zombie)
      zombie.body.immovable = immovable
      zombie.body.moves = !immovable
    }
  }

  addRandomZombie (randomPosition) {
    const { x, y } = randomPosition
    const randomNumber = Math.random() * 100
    for (let i = 0; i < this.zombiesProbabilityThresholds.length; i++) {
      const { threshold, zombieName } = this.zombiesProbabilityThresholds[i]
      if (randomNumber <= threshold) {
        this.addZombieByName(zombieName, x, y)
        return
      }
    }
  }
}

Director.MAX_ZOMBIES = 100

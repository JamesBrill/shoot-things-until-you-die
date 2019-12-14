import SoldierZombie from '../sprites/enemies/SoldierZombie'
import ChaserZombie from '../sprites/enemies/ChaserZombie'
import BossZombie from '../sprites/enemies/BossZombie'
import FodderZombie from '../sprites/enemies/FodderZombie'
import {
  getSpawnPointFurthestFromPlayer,
  getTopLeftSpawnPoint,
  getTopRightSpawnPoint,
  getBottomLeftSpawnPoint,
  getBottomRightSpawnPoint
} from '../utils/world'

export default class Director {
  constructor ({ game, player, enemies, pathfinder }) {
    this.game = game
    this.player = player
    this.enemies = enemies
    this.pathfinder = pathfinder
    this.healthMultiplier = 1
    this.speedMultiplier = 1
    this.initialiseZombieProbabilities()
    setInterval(this.addZombie.bind(this), 20000)
  }

  initialiseZombies () {
    this.addRandomZombie(getTopLeftSpawnPoint({ game: this.game }))
    this.addRandomZombie(getTopRightSpawnPoint({ game: this.game }))
    this.addRandomZombie(getBottomLeftSpawnPoint({ game: this.game }))
    this.addRandomZombie(getBottomRightSpawnPoint({ game: this.game }))
  }

  initialiseZombieProbabilities () {
    this.zombieProbabilities = {
      fodder: 80,
      chaser: 15,
      soldier: 5,
      boss: 0
    }

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
    }
    this.addZombie()
  }

  addZombie () {
    if (this.enemies.length >= Director.MAX_ZOMBIES) {
      return
    }
    const spawnPoint = getSpawnPointFurthestFromPlayer({ game: this.game, player: this.player })
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
    }
    if (zombie) {
      console.log('made a', zombieName)
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

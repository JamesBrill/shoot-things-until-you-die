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
    setInterval(this.addZombie.bind(this), 20000)
  }

  initialiseZombies () {
    this.addRandomZombie(this.game, getTopLeftSpawnPoint({ game: this.game }), this.player)
    this.addRandomZombie(this.game, getTopRightSpawnPoint({ game: this.game }), this.player)
    this.addRandomZombie(this.game, getBottomLeftSpawnPoint({ game: this.game }), this.player)
    this.addRandomZombie(this.game, getBottomRightSpawnPoint({ game: this.game }), this.player)
  }

  replaceZombie (enemy, increaseZombieHealth) {
    this.enemies.remove(enemy, true)
    if (increaseZombieHealth) {
      this.healthMultiplier += 0.001
    }
    this.addZombie()
  }

  addZombie () {
    if (this.enemies.length >= Director.MAX_ZOMBIES) {
      return
    }
    const spawnPoint = getSpawnPointFurthestFromPlayer({ game: this.game, player: this.player })
    this.addRandomZombie(
      this.game,
      spawnPoint,
      this.player,
      this.healthMultiplier
    )
  }

  addRandomZombie (game, randomPosition, player, healthMultiplier) {
    const { x, y } = randomPosition
    const randomNumber = Math.random()
    let randomZombie, immovable
    if (randomNumber > 0.81) {
      randomZombie = new SoldierZombie({
        game,
        x,
        y,
        player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else if (randomNumber > 0.21) {
      randomZombie = new FodderZombie({
        game,
        x,
        y,
        player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else if (randomNumber > 0.01) {
      randomZombie = new ChaserZombie({
        game,
        x,
        y,
        player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    } else {
      randomZombie = new BossZombie({
        game,
        x,
        y,
        player,
        healthMultiplier: this.healthMultiplier,
        pathfinder: this.pathfinder
      })
      immovable = false
    }
    this.enemies.add(randomZombie)
    randomZombie.body.immovable = immovable
    randomZombie.body.moves = !immovable
  }
}

Director.MAX_ZOMBIES = 100

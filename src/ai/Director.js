import SoldierZombie from '../sprites/enemies/SoldierZombie'
import ChaserZombie from '../sprites/enemies/ChaserZombie'
import SniperZombie from '../sprites/enemies/SniperZombie'
import { getPositionAtDistanceRangeFromPlayer } from '../utils/world'

export default class Director {
  constructor ({ game, player, enemies }) {
    this.game = game
    this.player = player
    this.enemies = enemies
    this.enemyCount = 5
    this.healthMultiplier = 1
    setInterval(this.addZombie.bind(this), 20000)
  }

  initialiseZombies () {
    const { width } = this.game.world
    for (let i = 0; i < this.enemyCount; i++) {
      const randomPosition = getPositionAtDistanceRangeFromPlayer(
        this.game.world,
        this.player,
        width * 0.35,
        width * 0.45
      )
      this.enemies.add(
        this.createRandomZombie(
          this.game,
          randomPosition,
          this.player
        )
      )
    }
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
    const randomPosition = getPositionAtDistanceRangeFromPlayer(
      this.game.world,
      this.player,
      this.getMinEnemyDistanceFromPlayer(),
      this.getMaxEnemyDistanceFromPlayer()
    )
    this.enemies.add(
      this.createRandomZombie(
        this.game,
        randomPosition,
        this.player,
        this.healthMultiplier
      )
    )
  }

  getMinEnemyDistanceFromPlayer () {
    const { width } = this.game.world
    return width * 0.35
  }

  getMaxEnemyDistanceFromPlayer () {
    const { width } = this.game.world
    return width
  }

  createRandomZombie (game, randomPosition, player, healthMultiplier) {
    const { x, y } = randomPosition
    const randomNumber = Math.random()
    if (randomNumber > 0.4) {
      return new SoldierZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
    } else if (randomNumber > 0.2) {
      return new SniperZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
    } else {
      return new ChaserZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
    }
  }
}

Director.MAX_ZOMBIES = 100

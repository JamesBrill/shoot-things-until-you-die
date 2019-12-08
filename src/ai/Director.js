import Zombie from '../sprites/enemies/Zombie'
import { getPositionAtDistanceRangeFromPlayer } from '../utils/world'

export default class Director {
  constructor ({ game, player, enemies }) {
    this.game = game
    this.player = player
    this.enemies = enemies
    this.healthMultiplier = 1
  }

  initialiseZombies () {
    const { width } = this.game.world
    for (let i = 0; i < 100; i++) {
      const randomPosition = getPositionAtDistanceRangeFromPlayer(
        this.game.world,
        this.player,
        1500,
        width * 0.45
      )
      this.enemies.add(
        Zombie.createRandom(
          this.game,
          randomPosition,
          this.player,
          this.game.world,
          this.getRandomZombieSpeed()
        )
      )
    }
  }

  replaceZombie (enemy, increaseZombieHealth) {
    this.enemies.remove(enemy, true)
    if (increaseZombieHealth) {
      this.healthMultiplier += 0.001
    }
    const randomPosition = getPositionAtDistanceRangeFromPlayer(
      this.game.world,
      this.player,
      this.getMinEnemyDistanceFromPlayer(),
      this.getMaxEnemyDistanceFromPlayer()
    )
    this.enemies.add(
      Zombie.createRandom(
        this.game,
        randomPosition,
        this.player,
        this.game.world,
        this.getRandomZombieSpeed(),
        this.healthMultiplier
      )
    )
  }

  getRandomZombieSpeed () {
    return 50 * Math.min(1, Math.random() * 3)
  }

  getMinEnemyDistanceFromPlayer () {
    return 1000
  }

  getMaxEnemyDistanceFromPlayer () {
    const { width } = this.game.world
    return width * 0.45
  }
}

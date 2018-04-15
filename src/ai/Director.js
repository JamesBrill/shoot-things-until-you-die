import Zombie from '../sprites/enemies/Zombie'
import { getPositionAtDistanceRangeFromPlayer } from '../utils/world'

export default class Director {
  constructor ({ game, player, enemies }) {
    this.game = game
    this.player = player
    this.enemies = enemies
    this.healthMultiplier = 1
    this.intensityCounter = 49
    this.intensity = this.getIntensity()
    setTimeout(this.increaseIntensity.bind(this), 1000)
    setTimeout(this.moveDistantZombies.bind(this), 1000)
  }

  increaseIntensity () {
    this.intensityCounter += 0.25
    if (this.intensity > 40) {
      this.intensityCounter += 1
    }
    this.intensity = this.getIntensity()
    setTimeout(this.increaseIntensity.bind(this), 1000)
  }

  getIntensity () {
    return Math.floor((Math.sin(0.1 * this.intensityCounter) + 1) * 50)
  }

  moveDistantZombies () {
    const maxEnemyDistanceFromPlayer = this.getMaxEnemyDistanceFromPlayer()
    const playerX = this.player.x
    const playerY = this.player.y
    for (let i = 0; i < this.enemies.children.length; i++) {
      const zombie = this.enemies.children[i]
      const distanceToPlayer = Math.sqrt(
        (playerX - zombie.x) ** 2 + (playerY - zombie.y) ** 2
      )
      if (distanceToPlayer > maxEnemyDistanceFromPlayer) {
        zombie.kill()
        this.replaceZombie(zombie)
      }
    }
    setTimeout(this.moveDistantZombies.bind(this), 1000)
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
          this.getMaxZombieSpeed()
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
        this.getMaxZombieSpeed(),
        this.healthMultiplier
      )
    )
  }

  getMaxZombieSpeed () {
    return Math.max(30, 2.5 * this.intensity)
  }

  getMinEnemyDistanceFromPlayer () {
    return 1000 + (100 - this.intensity) * 15
  }

  getMaxEnemyDistanceFromPlayer () {
    return this.getMinEnemyDistanceFromPlayer() + (101 - this.intensity) * 30
  }
}

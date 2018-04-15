import Zombie from '../sprites/enemies/Zombie'

export default class Director {
  constructor ({ game, player, enemies }) {
    this.game = game
    this.player = player
    this.enemies = enemies
    this.maxZombieSpeed = 200
    this.healthMultiplier = 1
  }

  initialiseZombies () {
    const { width } = this.game.world
    for (let i = 0; i < 100; i++) {
      const randomPosition = this.getPositionAtDistanceRangeFromPlayer(
        1000,
        width * 0.45
      )
      this.enemies.add(
        Zombie.createRandom(
          this.game,
          randomPosition,
          this.player,
          this.game.world,
          this.maxZombieSpeed
        )
      )
    }
  }

  replaceZombie (enemy) {
    this.enemies.removeChild(enemy)
    this.maxZombieSpeed = Math.min(this.maxZombieSpeed + 1, 270)
    this.healthMultiplier += 0.001
    const randomPosition = this.getPositionAtDistanceRangeFromPlayer(600, 800)
    this.enemies.add(
      Zombie.createRandom(
        this.game,
        randomPosition,
        this.player,
        this.game.world,
        this.maxZombieSpeed,
        this.healthMultiplier
      )
    )
  }

  getPositionAtDistanceRangeFromPlayer (
    minDistanceFromPlayer,
    maxDistanceFromPlayer
  ) {
    const { left, right, top, bottom } = this.game.world.bounds
    const playerX = this.player.x
    const playerY = this.player.y
    let randomX = this.generateRandomInteger(left, right)
    let randomY = this.generateRandomInteger(top, bottom)

    const xDistance = Math.abs(playerX - randomX)
    const yDistance = Math.abs(playerY - randomY)
    if (xDistance > maxDistanceFromPlayer) {
      if (randomX > playerX) {
        randomX = playerX + maxDistanceFromPlayer
      } else {
        randomX = playerX - maxDistanceFromPlayer
      }
    }
    if (yDistance > maxDistanceFromPlayer) {
      if (randomY > playerY) {
        randomY = playerY + maxDistanceFromPlayer
      } else {
        randomY = playerY - maxDistanceFromPlayer
      }
    }

    if (
      xDistance < minDistanceFromPlayer &&
      yDistance < minDistanceFromPlayer
    ) {
      if (xDistance > yDistance) {
        if (
          (randomX > playerX && playerX + minDistanceFromPlayer > right) ||
          (randomX <= playerX && playerX - minDistanceFromPlayer >= left)
        ) {
          randomX = playerX - minDistanceFromPlayer
        } else {
          randomX = playerX + minDistanceFromPlayer
        }
      } else {
        if (
          (randomY > playerY && playerY + minDistanceFromPlayer > bottom) ||
          (randomY <= playerY && playerY - minDistanceFromPlayer >= top)
        ) {
          randomY = playerY - minDistanceFromPlayer
        } else {
          randomY = playerY + minDistanceFromPlayer
        }
      }
    }

    return { x: randomX, y: randomY }
  }

  generateRandomInteger (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }
}

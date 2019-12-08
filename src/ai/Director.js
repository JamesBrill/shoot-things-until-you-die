import SoldierZombie from '../sprites/enemies/SoldierZombie'
import ChaserZombie from '../sprites/enemies/ChaserZombie'
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
    return 1000
  }

  getMaxEnemyDistanceFromPlayer () {
    const { width } = this.game.world
    return width * 0.45
  }

  createRandomZombie (game, randomPosition, player, healthMultiplier) {
    const { x, y } = randomPosition
    if (Math.random() > 0.1) {
      return new SoldierZombie({
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

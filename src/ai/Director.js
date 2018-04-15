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
    for (let i = 0; i < 100; i++) {
      this.enemies.add(
        Zombie.createRandom(
          this.game,
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
    this.enemies.add(
      Zombie.createRandom(
        this.game,
        this.player,
        this.game.world,
        this.maxZombieSpeed,
        this.healthMultiplier
      )
    )
  }
}

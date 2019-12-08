import SoldierZombie from '../sprites/enemies/SoldierZombie'
import ChaserZombie from '../sprites/enemies/ChaserZombie'
import SniperZombie from '../sprites/enemies/SniperZombie'
import BossZombie from '../sprites/enemies/BossZombie'
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
      this.addRandomZombie(
        this.game,
        randomPosition,
        this.player
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
    this.addRandomZombie(
      this.game,
      randomPosition,
      this.player,
      this.healthMultiplier
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

  addRandomZombie (game, randomPosition, player, healthMultiplier) {
    const { x, y } = randomPosition
    const randomNumber = Math.random()
    let randomZombie, immovable
    if (randomNumber > 0.41) {
      randomZombie = new SoldierZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
      immovable = false
    } else if (randomNumber > 0.21) {
      randomZombie = new SniperZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
      immovable = true
    } else if (randomNumber > 0.01) {
      randomZombie = new ChaserZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
      immovable = false
    } else {
      randomZombie = new BossZombie({
        game,
        x,
        y,
        player,
        healthMultiplier
      })
      immovable = false
    }
    this.enemies.add(randomZombie)
    randomZombie.body.immovable = immovable
    randomZombie.body.moves = !immovable
  }
}

Director.MAX_ZOMBIES = 100

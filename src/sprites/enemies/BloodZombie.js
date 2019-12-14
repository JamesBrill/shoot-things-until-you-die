import Zombie from './Zombie'
import ZombieNavigation from '../../ai/ZombieNavigation'

const ZombieMode = {
  CHASE: 'CHASE',
  WANDER: 'WANDER'
}

export default class BloodZombie extends Zombie {
  constructor ({ game, x, y, player, healthMultiplier, pathfinder, bloodManager }) {
    super({
      game,
      x,
      y,
      player,
      speed: BloodZombie.SPEED,
      size: BloodZombie.SIZE,
      health: BloodZombie.HEALTH * healthMultiplier,
      colour: BloodZombie.COLOUR
    })

    this.zombieNavigation = new ZombieNavigation({ zombie: this, player, pathfinder, game })
    this.bloodManager = bloodManager
    this.mode = ZombieMode.WANDER
    this.timeout = null
  }

  move () {
    if (this.mode === ZombieMode.CHASE) {
      this.zombieNavigation.followPlayer({ speed: 400 })
    } else if (this.mode === ZombieMode.WANDER) {
      if (this.bloodManager.bloodSplatters.length === 0) {
        this.zombieNavigation.wander()
      } else {
        const { centerX, centerY } = this.bloodManager.bloodSplatters.children[0]
        this.zombieNavigation.goTo({ x: centerX, y: centerY, strafeChangeChance: 0.9 })
      }
    }
  }

  act () { }

  chasePlayer () {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.mode = ZombieMode.CHASE
  }

  update () {
    this.game.physics.arcade.overlap(
      this,
      this.bloodManager.bloodDrips,
      this.chasePlayer,
      null,
      this
    )
  }
}

BloodZombie.HEALTH = 50
BloodZombie.SPEED = 150
BloodZombie.SIZE = 45
BloodZombie.COLOUR = 0xff69b4

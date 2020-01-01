import Phaser from 'phaser'
import MapPositionGenerator from '../utils/MapPositionGenerator'
import AmmoDrop from '../sprites/ammoDrops/AmmoDrop'
import HealthPack from '../sprites/ammoDrops/HealthPack'

export default class ItemManager {
  constructor ({ game, player }) {
    this.game = game
    this.player = player
    this.mapPositionGenerator = new MapPositionGenerator({ map: game.map, game })
    this.pickUpItemSound = this.game.add.audio('pick_up_ammo')

    this.initialiseAmmoDrops()
    this.initialiseHealthPacks()
  }

  initialiseAmmoDrops () {
    this.ammoDrops = this.game.add.group()
    this.ammoDrops.enableBody = true
    this.ammoDrops.physicsBodyType = Phaser.Physics.ARCADE
  }

  initialiseHealthPacks () {
    this.healthPacks = this.game.add.group()
    this.healthPacks.enableBody = true
    this.healthPacks.physicsBodyType = Phaser.Physics.ARCADE

    this.healthPacks.add(HealthPack.createRandom({
      game: this.game,
      player: this.player,
      mapPositionGenerator: this.mapPositionGenerator
    }))
  }

  handleAmmoPickUp (player, ammoDrop) {
    player.weapon.pickUpAmmo()
    this.pickUpItemSound.play()
    ammoDrop.kill()
    this.ammoDrops.removeChild(ammoDrop)
  }

  handleHealthPackPickUp (player, healthPack) {
    player.receiveHealth(healthPack.health)
    this.pickUpItemSound.play()
    healthPack.kill()
    this.healthPacks.removeChild(healthPack)
    this.healthPacks.add(HealthPack.createRandom({
      game: this.game,
      player,
      mapPositionGenerator: this.mapPositionGenerator
    }))
  }

  addAmmoDrop (enemy) {
    if (Math.random() > 0.99) {
      const { centerX, centerY } = enemy
      const x = centerX - 16
      const y = centerY - 16
      this.ammoDrops.add(new AmmoDrop({ game: this.game, x, y }))
    }
  }

  update () {
    this.game.physics.arcade.overlap(
      this.player,
      this.ammoDrops,
      this.handleAmmoPickUp,
      null,
      this
    )
    this.game.physics.arcade.overlap(
      this.player,
      this.healthPacks,
      this.handleHealthPackPickUp,
      null,
      this
    )
  }
}

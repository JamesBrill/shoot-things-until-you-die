/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import AmmoDrop from '../sprites/ammoDrops/AmmoDrop'
import Director from '../ai/Director'
import ScoreManager from '../ai/ScoreManager'
import Pistol from '../weapons/Pistol'
import LeverActionShotgun from '../weapons/LeverActionShotgun'
import SemiAutoShotgun from '../weapons/SemiAutoShotgun'
import AssaultRifle from '../weapons/AssaultRifle'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.world.setBounds(-5000, -5000, 10000, 10000)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.weapons = {
      pistol: new Pistol({ game: this.game }),
      leverActionShotgun: new LeverActionShotgun({ game: this.game }),
      semiAutoShotgun: new SemiAutoShotgun({ game: this.game }),
      assaultRifle: new AssaultRifle({ game: this.game })
    }

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      weapon: this.weapons.pistol
    })
    this.game.add.existing(this.player)
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true

    this.enemies = this.game.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE

    this.director = new Director({
      game: this.game,
      player: this.player,
      enemies: this.enemies
    })
    this.director.initialiseZombies()

    this.scoreManager = new ScoreManager({ game: this.game })

    this.ammoDrops = this.game.add.group()
    this.ammoDrops.enableBody = true
    this.ammoDrops.physicsBodyType = Phaser.Physics.ARCADE
    this.pickUpAmmoSound = this.game.add.audio('pick_up_ammo')

    for (let i = 0; i < 8; i++) {
      this.ammoDrops.add(AmmoDrop.createRandom(this.game, this.world))
    }

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      reload: this.game.input.keyboard.addKey(Phaser.Keyboard.R),
      weaponOne: this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
      weaponTwo: this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
      weaponThree: this.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
      weaponFour: this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR)
    }

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)
  }

  hitCallback (bullet, enemy) {
    this.player.weapon.hitTarget(bullet)
    this.scoreManager.registerHit()
    const isEnemyKilled = enemy.takeDamage(this.player.weapon)
    if (isEnemyKilled) {
      this.director.replaceZombie(enemy, true)
    }
  }

  handlePlayerDamage (player, enemy) {
    const isPlayerKilled = player.takeDamage(enemy)
    if (isPlayerKilled) {
      this.game.paused = true
    }
  }

  handleAmmoPickUp (player, ammoDrop) {
    AmmoDrop.addAmmo(this.weapons, ammoDrop)
    this.pickUpAmmoSound.play()
    ammoDrop.kill()
    this.ammoDrops.removeChild(ammoDrop)
    this.ammoDrops.add(AmmoDrop.createRandom(this.game, this.world))
  }

  update () {
    this.game.physics.arcade.overlap(
      this.player.weapon.bullets,
      this.enemies,
      this.hitCallback,
      null,
      this
    )
    this.game.physics.arcade.collide(
      this.enemies,
      this.enemies,
      null,
      null,
      this
    )
    this.game.physics.arcade.collide(
      this.player,
      this.enemies,
      this.handlePlayerDamage,
      null,
      this
    )
    this.game.physics.arcade.overlap(
      this.player,
      this.ammoDrops,
      this.handleAmmoPickUp,
      null,
      this
    )

    this.enemies.forEach(enemy => enemy.move())

    this.player.body.velocity.setTo(0, 0)
    const { worldX, worldY } = this.game.input.mousePointer
    this.player.aimAt(worldX, worldY)
    if (this.cursors.up.isDown) {
      this.player.move(UP, 300)
    } else if (this.cursors.down.isDown) {
      this.player.move(DOWN, 300)
    }

    if (this.cursors.left.isDown) {
      this.player.move(LEFT, 300)
    } else if (this.cursors.right.isDown) {
      this.player.move(RIGHT, 300)
    }

    if (this.cursors.weaponOne.isDown) {
      this.player.armWeapon(this.weapons.pistol)
    } else if (this.cursors.weaponTwo.isDown) {
      this.player.armWeapon(this.weapons.leverActionShotgun)
    } else if (this.cursors.weaponThree.isDown) {
      this.player.armWeapon(this.weapons.semiAutoShotgun)
    } else if (this.cursors.weaponFour.isDown) {
      this.player.armWeapon(this.weapons.assaultRifle)
    }

    if (this.cursors.reload.isDown) {
      this.player.weapon.reload()
    }

    if (this.game.input.mousePointer.isDown) {
      this.player.fire()
      Pistol.disableFiring()
    } else {
      Pistol.enableFiring()
    }
  }

  render () {}
}

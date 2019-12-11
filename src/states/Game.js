/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import BloodSplatter from '../sprites/BloodSplatter'
import AmmoDrop from '../sprites/ammoDrops/AmmoDrop'
import Director from '../ai/Director'
import ScoreManager from '../ai/ScoreManager'
import AudioManager from '../ai/AudioManager'
import DeathDisplay from '../ui/DeathDisplay'
import Pistol from '../weapons/Pistol'
import LeverActionShotgun from '../weapons/LeverActionShotgun'
import SemiAutoShotgun from '../weapons/SemiAutoShotgun'
import P90 from '../weapons/P90'
import M16 from '../weapons/M16'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'
import { createPathfinder } from '../utils/pathfinder'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.game.world.setBounds(-2000, -2000, 4000, 4000)

    const map = this.game.add.tilemap('map', 100, 100)
    map.addTilesetImage('tiles')
    // These are the indices of the tiles to have collision physics applied.
    // They are determined by their position in the tilemap image with indices
    // running from left to right, top to bottom. The size of each tile in the
    // tilemap is determined above when the map is created
    map.setCollision(0)
    this.game.map = map
    this.layer = map.createLayer(0)
    this.layer.resizeWorld()

    this.pathfinder = createPathfinder(map)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.bloodSplatters = this.game.add.group()

    this.weapons = {
      pistol: new Pistol({ game: this.game }),
      leverActionShotgun: new LeverActionShotgun({ game: this.game }),
      semiAutoShotgun: new SemiAutoShotgun({ game: this.game }),
      p90: new P90({ game: this.game }),
      m16: new M16({ game: this.game })
    }

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      weapon: this.weapons.pistol
    })

    this.enemies = this.game.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE

    this.director = new Director({
      game: this.game,
      player: this.player,
      enemies: this.enemies,
      pathfinder: this.pathfinder
    })
    this.director.initialiseZombies()

    this.ammoDrops = this.game.add.group()
    this.ammoDrops.enableBody = true
    this.ammoDrops.physicsBodyType = Phaser.Physics.ARCADE
    this.pickUpAmmoSound = this.game.add.audio('pick_up_ammo')

    for (let i = 0; i < 10; i++) {
      this.ammoDrops.add(AmmoDrop.createRandom(this.game, this.world))
    }

    this.game.add.existing(this.player)
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true
    this.player.disabled = false

    this.audioManager = new AudioManager({ game: this.game })
    this.scoreManager = new ScoreManager({
      game: this.game,
      scores: this.scores
    })

    this.cursors = {
      up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      reload: this.game.input.keyboard.addKey(Phaser.Keyboard.R),
      weaponOne: this.game.input.keyboard.addKey(Phaser.Keyboard.ONE),
      weaponTwo: this.game.input.keyboard.addKey(Phaser.Keyboard.TWO),
      weaponThree: this.game.input.keyboard.addKey(Phaser.Keyboard.THREE),
      weaponFour: this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR),
      weaponFive: this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE),
      speedUp: this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT)
    }

    //  Notice that the sprite doesn't have any momentum at all,
    //  it's all just set by the camera follow type.
    //  0.1 is the amount of linear interpolation to use.
    //  The smaller the value, the smooth the camera (and the longer it takes to catch up)
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1)

    Object.keys(this.weapons).forEach(weapon =>
      this.weapons[weapon].weaponDisplay.bringToTop()
    )

    this.deathDisplay = new DeathDisplay({ game: this.game })
  }

  restartGame () {
    this.deathDisplay.hideDeathScreen()
    this.state.start('Game')
  }

  hitCallback (bullet, enemy) {
    this.player.weapon.hitTarget(bullet)
    this.scoreManager.registerHit()
    const isEnemyKilled = enemy.takeDamage(this.player.weapon)
    if (isEnemyKilled) {
      const { angleBetween, radToDeg } = this.game.math
      this.scoreManager.registerKill()
      this.director.replaceZombie(enemy, true)
      this.audioManager.playBloodSpatterSound(enemy)
      const bloodSplatter = new BloodSplatter({
        game: this.game,
        enemy,
        size: enemy.size,
        angle:
          radToDeg(
            angleBetween(this.player.x, this.player.y, enemy.x, enemy.y)
          ) - 45
      })
      this.bloodSplatters.add(bloodSplatter)
      if (this.bloodSplatters.children.length > 100) {
        const firstBloodSplatter = this.bloodSplatters.children[0]
        this.bloodSplatters.remove(firstBloodSplatter)
      }
    }
  }

  onPlayerTakeHit (enemy, player, bullet) {
    enemy.weapon.hitTarget(bullet)
    this.handlePlayerDamage(player, enemy.weapon)
  }

  handlePlayerDamage (player, enemy) {
    const isPlayerKilled = player.takeDamage(enemy)
    if (isPlayerKilled) {
      this.player.disabled = true
      this.scoreManager.submitScore()
      this.audioManager.playDeathSound()
      this.deathDisplay.showDeathScreen()
      setTimeout(this.restartGame.bind(this), 7000)
    }
  }

  handleAmmoPickUp (player, ammoDrop) {
    AmmoDrop.addAmmo(this.weapons, ammoDrop)
    this.pickUpAmmoSound.play()
    ammoDrop.kill()
    this.ammoDrops.removeChild(ammoDrop)
    this.ammoDrops.add(AmmoDrop.createRandom(this.game, this.world))
  }

  hitWallCallback (bullet) {
    bullet.kill()
  }

  update () {
    this.pathfinder.calculate()
    this.game.physics.arcade.collide(this.player, this.layer)
    this.game.physics.arcade.collide(
      this.player.weapon.bullets,
      this.layer,
      this.hitWallCallback,
      null,
      this
    )

    this.game.physics.arcade.overlap(
      this.player.weapon.bullets,
      this.enemies,
      this.hitCallback,
      null,
      this
    )

    this.enemies.forEach(enemy => {
      if (enemy.weapon) {
        this.game.physics.arcade.overlap(
          enemy.weapon.bullets,
          this.player,
          (...args) => this.onPlayerTakeHit(enemy, ...args),
          null,
          this
        )
        this.game.physics.arcade.collide(
          enemy.weapon.bullets,
          this.layer,
          this.hitWallCallback,
          null,
          this
        )
      }
    })

    this.game.physics.arcade.collide(
      this.enemies,
      this.enemies,
      null,
      null,
      this
    )
    this.game.physics.arcade.collide(
      this.enemies,
      this.layer,
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
    this.enemies.forEach(enemy => enemy.act())

    if (!this.player.disabled) {
      this.player.body.velocity.setTo(0, 0)
      const { worldX, worldY } = this.game.input.mousePointer
      this.player.aimAt(worldX, worldY)
      const speedUp = this.cursors.speedUp.isDown
      const velocity = speedUp ? 450 : 300

      if (this.cursors.up.isDown) {
        this.player.move(UP, velocity, speedUp)
      } else if (this.cursors.down.isDown) {
        this.player.move(DOWN, velocity, speedUp)
      }

      if (this.cursors.left.isDown) {
        this.player.move(LEFT, velocity, speedUp)
      } else if (this.cursors.right.isDown) {
        this.player.move(RIGHT, velocity, speedUp)
      }

      if (!this.cursors.up.isDown &&
          !this.cursors.down.isDown &&
          !this.cursors.left.isDown &&
          !this.cursors.right.isDown) {
        this.player.stopMoving()
      }

      if (this.cursors.weaponOne.isDown) {
        this.player.armWeapon(this.weapons.pistol)
      } else if (this.cursors.weaponTwo.isDown) {
        this.player.armWeapon(this.weapons.leverActionShotgun)
      } else if (this.cursors.weaponThree.isDown) {
        this.player.armWeapon(this.weapons.semiAutoShotgun)
      } else if (this.cursors.weaponFour.isDown) {
        this.player.armWeapon(this.weapons.p90)
      } else if (this.cursors.weaponFive.isDown) {
        this.player.armWeapon(this.weapons.m16)
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
  }

  render () {}
}

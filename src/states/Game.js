/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player'
import Director from '../ai/Director'
import ScoreManager from '../ai/ScoreManager'
import AudioManager from '../ai/AudioManager'
import ItemManager from '../ai/ItemManager'
import BloodManager from '../ai/BloodManager'
import DeathDisplay from '../ui/DeathDisplay'
import Pistol from '../weapons/Pistol'
import LeverActionShotgun from '../weapons/LeverActionShotgun'
import SemiAutoShotgun from '../weapons/SemiAutoShotgun'
import P90 from '../weapons/P90'
import M16 from '../weapons/M16'
import GhostPistol from '../weapons/GhostPistol'
import { UP, DOWN, LEFT, RIGHT } from '../constants/directions'
import { createPathfinder } from '../utils/pathfinder'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const map = this.game.add.tilemap('map2', 100, 100)
    map.addTilesetImage('tileset')
    // These are the indices of the tiles to have collision physics applied.
    // They are determined by their position in the tilemap image with indices
    // running from left to right, top to bottom. The size of each tile in the
    // tilemap is determined above when the map is created
    map.setCollision(0)
    this.game.map = map
    this.layer = map.createLayer(0)
    this.layer.resizeWorld()
    this.game.layer = this.layer

    this.pathfinder = createPathfinder(map)

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.weapons = {
      pistol: new Pistol({ game: this.game }),
      leverActionShotgun: new LeverActionShotgun({ game: this.game }),
      semiAutoShotgun: new SemiAutoShotgun({ game: this.game }),
      p90: new P90({ game: this.game }),
      m16: new M16({ game: this.game }),
      ghostPistol: new GhostPistol({ game: this.game })
    }

    this.bloodManager = new BloodManager({ game: this.game })

    this.enemies = this.game.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.ARCADE

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      weapon: this.weapons.pistol,
      bloodManager: this.bloodManager,
      onHitEnemy: this.hitCallback.bind(this),
      enemies: this.enemies
    })

    this.director = new Director({
      game: this.game,
      player: this.player,
      enemies: this.enemies,
      pathfinder: this.pathfinder,
      bloodManager: this.bloodManager
    })
    this.director.initialiseZombies()

    this.game.add.existing(this.player)
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true
    this.player.body.friction = new Phaser.Point(0, 0)
    this.player.disabled = false

    this.itemManager = new ItemManager({ game: this.game, player: this.player })
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
      weaponSix: this.game.input.keyboard.addKey(Phaser.Keyboard.SIX),
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
    this.director.reset()
    this.bloodManager.reset()
    this.deathDisplay.hideDeathScreen()
    this.state.start('Game')
  }

  hitCallback (bullet, enemy) {
    if ((!enemy.isGhost && !this.player.weapon.isGhost) ||
        (enemy.isGhost && this.player.weapon.isGhost)) {
      this.player.weapon.hitTarget(bullet)
      this.scoreManager.registerHit()
      const isEnemyKilled = enemy.takeDamage(this.player.weapon)
      if (isEnemyKilled) {
        this.scoreManager.registerKill()
        this.director.replaceZombie(enemy, true)
        if (!enemy.isGhost) {
          this.itemManager.addAmmoDrop(enemy)
          this.audioManager.playBloodSpatterSound(enemy)
          this.bloodManager.createBloodSplatter(enemy, this.player)
        }
      }
    }
  }

  update () {
    this.pathfinder.calculate()

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
      } else if (this.cursors.weaponSix.isDown) {
        this.player.armWeapon(this.weapons.ghostPistol)
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
      this.itemManager.update()

      if (this.player.isDead()) {
        this.player.disabled = true
        this.scoreManager.submitScore()
        this.audioManager.playDeathSound()
        this.deathDisplay.showDeathScreen()
        setTimeout(this.restartGame.bind(this), 7000)
      }
    }
  }

  render () {
    const { fodder, chaser, soldier, blood, boss, ghost } = this.director.zombieProbabilities
    this.game.debug.text('fodder: ' + fodder + '%', 20, 500, 'blue', 'Segoe UI')
    this.game.debug.text('chaser: ' + chaser + '%', 20, 515, 'blue', 'Segoe UI')
    this.game.debug.text('soldier: ' + soldier + '%', 20, 530, 'blue', 'Segoe UI')
    this.game.debug.text('blood: ' + blood + '%', 20, 545, 'blue', 'Segoe UI')
    this.game.debug.text('boss: ' + boss + '%', 20, 560, 'blue', 'Segoe UI')
    this.game.debug.text('ghost: ' + ghost + '%', 20, 575, 'blue', 'Segoe UI')
  }
}

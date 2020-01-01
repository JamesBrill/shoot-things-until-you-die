import Phaser from 'phaser'

export default class AmmoDrop extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'pistol_ammo')
  }
}

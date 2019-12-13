import Phaser from 'phaser'

export default class HealthPack extends Phaser.Sprite {
  constructor ({ game, x, y, player }) {
    super(game, x, y, 'health_pack')
    this.health = player.maxHealth * 0.25
  }
}

HealthPack.createRandom = ({ game, player, mapPositionGenerator }) => {
  const { x, y } = mapPositionGenerator.getRandomPositionAwayFromPlayer({ player })
  return new HealthPack({game, x, y, player})
}

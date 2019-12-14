export default class MapPositionGenerator {
  constructor ({ map, game }) {
    this.game = game
    this.availablePositions = []
    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        if (!map.getTile(x, y, map.getLayer(0))) {
          this.availablePositions.push({x, y})
        }
      }
    }
  }

  getRandomPositionAwayFromPlayer ({ player }) {
    const mapWidth = this.game.map.width
    const tileSize = this.game.world.width / mapWidth

    const playerX = Math.floor(player.world.x / tileSize)
    const playerY = Math.floor(player.world.y / tileSize)

    const potentialPositions = []
    for (let i = 0; i < this.availablePositions.length; i++) {
      const { x, y } = this.availablePositions[i]
      if ((Math.abs(x - playerX) + Math.abs(y - playerY)) > 10) {
        potentialPositions.push({ x, y })
      }
    }
    if (potentialPositions.length === 0) {
      return {
        x: (this.availablePositions[0].x + 0.5) * tileSize,
        y: (this.availablePositions[0].y + 0.5) * tileSize
      }
    } else {
      const randomIndex = Math.floor(Math.random() * potentialPositions.length)
      return {
        x: (potentialPositions[randomIndex].x + 0.5) * tileSize,
        y: (potentialPositions[randomIndex].y + 0.5) * tileSize
      }
    }
  }
}

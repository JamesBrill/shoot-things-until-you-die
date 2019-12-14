export function getRandomSpawnPointAwayFromPlayer ({ game, player }) {
  const pixelWidth = game.map.layers[0].widthInPixels
  const pixelHeight = game.map.layers[0].heightInPixels
  const mapWidth = game.map.width
  const mapHeight = game.map.height
  const tileSize = game.world.width / mapWidth
  const edgeOffset = 1.5 * tileSize

  const playerX = Math.floor(player.world.x / tileSize)
  const playerY = Math.floor(player.world.y / tileSize)

  const randomXOffset = Math.random() * tileSize - 0.5 * tileSize
  const randomYOffset = Math.random() * tileSize - 0.5 * tileSize
  const spawnPoints = {
    bottomRight: { x: (pixelWidth - edgeOffset) + randomXOffset, y: (pixelHeight - edgeOffset) + randomYOffset },
    bottomLeft: { x: edgeOffset + randomXOffset, y: (pixelHeight - edgeOffset) + randomYOffset },
    topLeft: { x: edgeOffset + randomXOffset, y: edgeOffset + randomYOffset },
    topRight: { x: (pixelWidth - edgeOffset) + randomXOffset, y: edgeOffset + randomYOffset }
  }
  const { bottomRight, bottomLeft, topLeft, topRight } = spawnPoints
  const randomIndex = Math.floor(Math.random() * 3)
  if (playerX <= mapWidth * 0.5 && playerY <= mapHeight * 0.5) {
    return [bottomRight, bottomLeft, topRight][randomIndex]
  } else if (playerX > mapWidth * 0.5 && playerY <= mapHeight * 0.5) {
    return [bottomRight, bottomLeft, topLeft][randomIndex]
  } else if (playerX > mapWidth * 0.5 && playerY > mapHeight * 0.5) {
    return [topLeft, bottomLeft, topRight][randomIndex]
  } else {
    return [bottomRight, topLeft, topRight][randomIndex]
  }
}

export function getTopLeftSpawnPoint ({ game }) {
  const mapWidth = game.map.width
  const tileSize = game.world.width / mapWidth
  const edgeOffset = 1.5 * tileSize
  return { x: edgeOffset, y: edgeOffset }
}

export function getTopRightSpawnPoint ({ game }) {
  const pixelWidth = game.map.layers[0].widthInPixels
  const mapWidth = game.map.width
  const tileSize = game.world.width / mapWidth
  const edgeOffset = 1.5 * tileSize
  return { x: pixelWidth - edgeOffset, y: edgeOffset }
}

export function getBottomLeftSpawnPoint ({ game }) {
  const pixelHeight = game.map.layers[0].heightInPixels
  const mapWidth = game.map.width
  const tileSize = game.world.width / mapWidth
  const edgeOffset = 1.5 * tileSize
  return { x: edgeOffset, y: pixelHeight - edgeOffset }
}

export function getBottomRightSpawnPoint ({ game }) {
  const pixelWidth = game.map.layers[0].widthInPixels
  const pixelHeight = game.map.layers[0].heightInPixels
  const mapWidth = game.map.width
  const tileSize = game.world.width / mapWidth
  const edgeOffset = 1.5 * tileSize
  return { x: pixelWidth - edgeOffset, y: pixelHeight - edgeOffset }
}

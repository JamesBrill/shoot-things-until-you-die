export function getPositionAtDistanceRangeFromPlayer (
  world,
  player,
  minDistanceFromPlayer,
  maxDistanceFromPlayer
) {
  const { left, right, top, bottom } = world.bounds
  const playerX = player.x
  const playerY = player.y
  let randomX = generateRandomInteger(left, right)
  let randomY = generateRandomInteger(top, bottom)

  const xDistance = Math.abs(playerX - randomX)
  const yDistance = Math.abs(playerY - randomY)
  if (xDistance > maxDistanceFromPlayer) {
    if (randomX > playerX) {
      randomX = playerX + maxDistanceFromPlayer
    } else {
      randomX = playerX - maxDistanceFromPlayer
    }
  }
  if (yDistance > maxDistanceFromPlayer) {
    if (randomY > playerY) {
      randomY = playerY + maxDistanceFromPlayer
    } else {
      randomY = playerY - maxDistanceFromPlayer
    }
  }

  if (xDistance < minDistanceFromPlayer && yDistance < minDistanceFromPlayer) {
    if (xDistance > yDistance) {
      if (
        (randomX > playerX && playerX + minDistanceFromPlayer > right) ||
        (randomX <= playerX && playerX - minDistanceFromPlayer >= left)
      ) {
        randomX = playerX - minDistanceFromPlayer
      } else {
        randomX = playerX + minDistanceFromPlayer
      }
    } else {
      if (
        (randomY > playerY && playerY + minDistanceFromPlayer > bottom) ||
        (randomY <= playerY && playerY - minDistanceFromPlayer >= top)
      ) {
        randomY = playerY - minDistanceFromPlayer
      } else {
        randomY = playerY + minDistanceFromPlayer
      }
    }
  }

  return { x: randomX, y: randomY }
}

function generateRandomInteger (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

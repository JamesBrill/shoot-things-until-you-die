import EasyStar from 'easystarjs'

export function createPathfinder (map) {
  // eslint-disable-next-line new-cap
  const pathfinder = new EasyStar.js()
  var grid = []
  for (var y = 0; y < map.height; y++) {
    var col = []
    for (var x = 0; x < map.width; x++) {
      const tile = map.getTile(x, y, map.getLayer(0))
      if (tile) {
        col.push(tile.index)
      } else {
        col.push(-1)
      }
    }
    grid.push(col)
  }
  pathfinder.setGrid(grid)
  pathfinder.setAcceptableTiles([-1])
  pathfinder.enableDiagonals()
  return pathfinder
}

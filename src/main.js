import 'pixi'
import 'p2'
import Phaser from 'phaser'
import Bowser from 'bowser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'

class Game extends Phaser.Game {
  constructor () {
    const docElement = document.documentElement
    const width = docElement.clientWidth
    const height = docElement.clientHeight

    super(width, height, Phaser.CANVAS, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('Game', GameState, false)

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }
}

const browser = Bowser.getParser(window.navigator.userAgent)
if (
  browser.getBrowserName() === 'Chrome' &&
  browser.getPlatformType() === 'desktop'
) {
  window.game = new Game()

  if (window.cordova) {
    var app = {
      initialize: function () {
        document.addEventListener(
          'deviceready',
          this.onDeviceReady.bind(this),
          false
        )
      },

      // deviceready Event Handler
      //
      onDeviceReady: function () {
        this.receivedEvent('deviceready')

        // When the device is ready, start Phaser Boot state.
        window.game.state.start('Boot')
      },

      receivedEvent: function (id) {
        console.log('Received Event: ' + id)
      }
    }

    app.initialize()
  }
} else {
  const incompatibilityWarning = document.getElementById(
    'incompatibilityWarning'
  )
  incompatibilityWarning.classList.remove('hidden')
}

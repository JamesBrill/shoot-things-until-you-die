import Zombie from '../sprites/enemies/Zombie'

export default class AudioManager {
  constructor ({ game }) {
    this.game = game
    this.bloodSplatterSounds = []
    for (let i = 1; i <= 4; i++) {
      const bloodSplatterSound = this.game.add.audio(`blood_splatter_${i}`)
      bloodSplatterSound.allowMultiple = true
      this.bloodSplatterSounds.push(bloodSplatterSound)
    }
  }

  playBloodSpatterSound (enemy) {
    if (enemy.size === Zombie.NORMAL_SIZE) {
      const randomSoundIndex = Math.floor(Math.random() * 2)
      this.bloodSplatterSounds[randomSoundIndex].play()
    } else {
      const randomSoundIndex = Math.floor(Math.random() * 2) + 2
      this.bloodSplatterSounds[randomSoundIndex].play()
    }
  }
}

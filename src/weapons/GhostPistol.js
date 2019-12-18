import Pistol from './Pistol'
import WeaponDisplay from '../ui/WeaponDisplay'

export default class GhostPistol extends Pistol {
  constructor ({ game }) {
    super({
      game,
      bulletColour: 0xffffff,
      firingConeColour: 0xffffff,
      weaponDisplay: new WeaponDisplay({
        game,
        x: 8,
        y: GhostPistol.DISPLAY_Y + 8,
        displayName: GhostPistol.DISPLAY_NAME,
        currentAmmo: GhostPistol.MAX_BULLETS,
        ammoReserves: GhostPistol.AMMO_RESERVES
      }),
      fireSound: game.add.audio('ghost_pistol_fire')
    })

    this.isGhost = true
  }
}

GhostPistol.MAX_BULLETS = 12
GhostPistol.AMMO_RESERVES = 128
GhostPistol.DISPLAY_NAME = 'Ghost Pistol'
GhostPistol.DISPLAY_Y = 250

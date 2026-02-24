import type { World } from "./world";

export type ComponentID = Symbol

export class Scene {
  #activeSystems: any[] = []
  #components: ComponentID[] = []
  #active: boolean = false;

  constructor() {

  }

  start(world: World) {
    this.activate()
  }

  addSystem(sys: any) {
    if (!this.#active) {
      this.#activeSystems.push(sys)
    }
  }

  activate(): boolean {
    this.#active = true;
    return true
  }

  getMask(...components: ComponentID[]) {
    let mask = 0;
    components.forEach(component => {
      let i = this.#components.findIndex(v => v == component)
      if (i >= 0) mask |= (1 << i);
    })
    return mask;
  }
  
}
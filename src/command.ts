import type { ComponentDef } from "./component";
import type { EntityID } from "./entity";
import type { World } from "./world";

export class Command {

  #world: World;
  #tasks: any[];

  constructor(world: World) {
    this.#world = world;
    this.#tasks = []
  }

  setEntity(entity: EntityID, component: ComponentDef, value: any) {
    // this.world.setComponent(entity, )
  }

  exec() {
    this.#tasks.forEach(task => {
      // todo : exec task 
      //this.#world.setComponent(task)
    })
  }
}
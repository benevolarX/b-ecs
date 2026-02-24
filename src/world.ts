import type { ComponentDef } from "./component";
import type { EntityID } from "./entity";
import type { IECSComponent } from "./types";

export class ECSWorld {

  private components: Set<IECSComponent>

  constructor() {
    this.components = new Set()
  }

  registerComponent(component: IECSComponent) {
    this.components.add(component)
  }

  createEntity(): EntityID {
    return 0;
  }

  setComponent(entity: EntityID, component: ComponentDef, value: any) {

  }

}
//import type { ComponentDef } from "./component";
import { EntityManager, type EntityID } from "./entity";
import type { Scene } from "./scene";
import type { Token } from "./utils";

export class World {

  #entities = new Set<EntityID>();
  #scenes: Scene[] = [];
  #currentSceneId: number|null = null;
  #entityManager: EntityManager;
  components: Record<string, Token<any>>;

  constructor(components: any) {
    this.components = components
    this.#entityManager = new EntityManager()
  }

  start() {
    if (this.#currentSceneId != null) {
      let scene = this.#scenes[this.#currentSceneId];
      if (scene) {
        // todo : this.command
        scene.start(this);
      }
    }
  }

  createEntity(): EntityID {
    const id: EntityID = this.#entityManager.create()
    this.#entities.add(id);
    return id;
  }

  destroyEntity(entity: EntityID) {
    // todo : suppression des composants
    this.#entityManager.destroy(entity);
  }

  setComponent(entity: EntityID, component: any, value: any) {

  }

}
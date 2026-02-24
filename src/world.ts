import type { ComponentDef } from "./component";
import { EntityManager, type EntityID } from "./entity";
import type { Scene } from "./scene";

export class World {

  #components: Set<any>;
  #entities = new Set<EntityID>();
  #scenes: Scene[] = [];
  #currentSceneId: number|null = null;
  #entityManager: EntityManager;

  constructor() {
    this.#components = new Set()
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

  registerComponent(component: any) {
    this.#components.add(component)
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

  setComponent(entity: EntityID, component: ComponentDef, value: any) {

  }

}
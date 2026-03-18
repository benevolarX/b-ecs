//import type { EntityID } from "./entity";
import type { ISystem, SystemConstructor } from "./system";
import { type ToTokenRegistry, type IType, type Token, type Result, ok, err, type ComponentSchema, isIType, type QueryResult, type NoEmptyArray, type NonEmptyTokenArray, type Val } from "./utils"
enum ECSStep {
  COMPONENTS,
  SYSTEMS,
  SCENES,
  RUN
}

export function createECS() {

  let step: ECSStep = ECSStep.COMPONENTS;
  const componentNameToSymbol = new Map<string, symbol>();
  const symbolToComponent = new Map<symbol, ComponentSchema>();

  const systemNameToSymbol = new Map<string, symbol>();
  const symbolToSystem = new Map<symbol, SystemConstructor<any>>();

  function buildSceneStep<T>(systemList: any[]) {
    /*
      if (step != ECSStep.SCENES) { }
    */
    function addComponent() {
      
      return null;
    }
    return { addComponent }
  }

  function buildWorld<R extends Record<string, ComponentSchema>>(components: ToTokenRegistry<R>) {

    function getDefineQueries() {
      return function defineQueries<Q extends Record<string, NonEmptyTokenArray>>(queries: Q): SystemConstructor<Q> {
        return class implements ISystem<Q> {

          queries!: { [K in keyof Q]: { each(cb: (components: QueryResult<Q[K]>) => void): void } }
          update(time: number): void {
            
          }
        }
      }
    }
    function registerSystems<S extends Record<string, SystemConstructor<any>>>(systemList: S) {
      if (step != ECSStep.SYSTEMS) {
        throw new Error("systems already defined")
      }
      step = ECSStep.SCENES;
      const result = Object.create(null)

      for (const key in systemList) {
        const sym = Symbol(key);
        systemNameToSymbol.set(key, sym);
        symbolToSystem.set(sym, systemList[key] as SystemConstructor<any>);
        result[key] = sym;// as Token<R[typeof key], typeof key>;
      }
      return { systems: result, sceneStep: buildSceneStep<S>(result) }
    }
    return { getDefineQueries, registerSystems }
  }

  function defineComponents<R extends Record<string, ComponentSchema>>(registry: R) {
    if (step != ECSStep.COMPONENTS) {
      throw new Error("components already defined")
    }
    step = ECSStep.SYSTEMS;
    const result = Object.create(null) as ToTokenRegistry<R>;
    for (const key in registry) {
      const sym = Symbol(key);
      componentNameToSymbol.set(key, sym);
      symbolToComponent.set(sym, registry[key] as ComponentSchema);
      result[key] = sym as Token<R[typeof key], typeof key>;
    }
    return { components: result, world: buildWorld<R>(result) }
  }

  /*
  function addComponent<S extends Token<any>>(
    entity: EntityID,
    componentToken: S,
    val: Val<S> // val: Strict<Val<S>>
  ): Result<Val<S>, string> {
    const schema = symbolToSchema.get(componentToken);
    if (!schema) {
      return err("Unknown componentToken")
    }

    if (isIType(schema)) {
      if (!(schema as IType<any>).isValid(val)) return err("Invalid value");
      return ok(val);
    }

    for (const key in schema) {
      const type: IType<any> = schema[key] as IType<any>;
      const value = (val as any)[key];
      if (!type.isValid(value)) {
        return err(`Invalid value for ${key}`);
      }
    }

    // Ici tu brancheras ton stockage ECS réel
    // entityComponents.get(entity).set(componentType, val)
    // entityComponents.get(componentType).set(entity, val)

    // pour le moment on ne fait que valider le paramètre
    return ok(val);
  }*/

  return { defineComponents }
}

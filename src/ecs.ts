import type { EntityID } from "./entity";
import { type ToTokenRegistry, type IType, type Token, type Val, type Result, ok, err, type ComponentSchema, isIType } from "./utils"

/*
function defineQueries<Q extends Record<string, Token<any>[]>>(queries: Q) {
  return class {
    protected queries!: {
      [K in keyof Q]: {
        each(cb: (components: QueryResult<Q[K]>) => void): void
      }
    }
    abstract update(command: Command, time: number): void
  }
}
*/

export function createECS() {

  const nameToSymbol = new Map<string, symbol>();
  const symbolToSchema = new Map<symbol, ComponentSchema>();

  function buildSceneStep() {
    function addComponent() {
      return null;
    }
    return { addComponent }
  }

  function buildWorld<R extends Record<string, ComponentSchema>>(components: ToTokenRegistry<R>) {

    function getDefineQueries() {
      function defineQueries() {

      }
      return defineQueries 
    }
    function registerSystem() {
      return null
    }
    function nextStepScenes() {
      return buildSceneStep()
    }
    return { getDefineQueries, registerSystem, nextStepScenes }
  }

  function defineComponents<R extends Record<string, ComponentSchema>>(registry: R)
  /* :{ components: ToTokenRegistry<R>, world: any }*/ {
    const result = Object.create(null) as ToTokenRegistry<R>;
    for (const key in registry) {
      const sym = Symbol(key);
      nameToSymbol.set(key, sym);
      symbolToSchema.set(sym, registry[key] as ComponentSchema);
      result[key] = sym as Token<R[typeof key], typeof key>;
    }
    return { components: result, world: buildWorld<R>(result) }
    //return result;
  }

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
  }

  return { defineComponents }
}

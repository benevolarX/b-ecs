import type { EntityID } from "./entity";
import { type ToTokenRegistry, type IType, type Token, type Val, type Result, ok, err } from "./utils"

export function createECS() {

  const nameToSymbol = new Map<string, symbol>();
  const symbolToSchema = new Map<symbol, Record<string, IType<any>>>();

  function defineComponents<R extends Record<string, Record<string, IType<any>>>>(registry: R): ToTokenRegistry<R> {
    const result = {} as ToTokenRegistry<R>;
    for (const key in registry) {
      const sym = Symbol(key);
      nameToSymbol.set(key, sym);
      symbolToSchema.set(sym, registry[key] as Record<string, IType<any>>);
      result[key] = sym as Token<R[typeof key]>;
    }
    return result;
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
    for (const key in schema) {
      const type: IType<any> = schema[key] as IType<any>;
      const value = (val as any)[key];
      if (!type.isValid(value)) {
        return err(`Invalid value for ${key}`)
      }
    }

    // Ici tu brancheras ton stockage ECS réel
    // entityComponents.get(entity).set(componentType, val)
    // entityComponents.get(componentType).set(entity, val)

    return ok(val);
  }

  return { defineComponents, addComponent }
}

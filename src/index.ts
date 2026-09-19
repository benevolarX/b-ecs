import type { z } from "zod";
import type { NoEmptyArray } from "./utils";

type ComponentRef<K extends PropertyKey> = { readonly key: K };
type ComponentRefs<S extends z.ZodObject> = { [K in keyof S["shape"]]: ComponentRef<K> };
type ComponentValue<S extends z.ZodObject, K extends keyof S["shape"]> = z.infer<S["shape"][K]>;
type QueryResult<S extends z.ZodObject, R extends readonly ComponentRef<keyof S["shape"]>[]> = {
  [P in R[number] as P["key"]]: ComponentValue<S, P["key"]>;
};
type QueryDefinitions<S extends z.ZodObject> = Record<string, readonly ComponentRef<keyof S["shape"]>[]>;
type Queries<S extends z.ZodObject, Q extends QueryDefinitions<S>> = {
  [K in keyof Q]: { each(callback: (components: QueryResult<S, Q[K]>) => void): void; };
};


interface ISystem<Q> {
  queries: Q;
  update(time: number): void
}

function defineQueries<S extends z.ZodObject>(schema: S) {
  return function <Q extends QueryDefinitions<S>>(definitions: Q) {
    // Le constructeur retourné par defineQueries
    return class implements ISystem<Queries<S, Q>> {
      update(time: number): void {

      }
      queries!: Queries<S, Q>;
    }
  };
}

export function createECS() {

  function defineComponents<S extends z.ZodObject>(componentsDef: S) {
    //let components = componentsDef.shape;
    const components = new Proxy({} as ComponentRefs<S>, {
      get(_, key: string | symbol) {
        return key
      },
    });

    const world = {
      getDefineQueries() {
        return defineQueries(componentsDef);
      },
    };
    return { components, world }
  }
  return { defineComponents }
}

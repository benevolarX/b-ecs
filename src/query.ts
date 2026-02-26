export interface IQuery<T extends number> { // number = bitmask of component
  with: Set<T>,
  without?: Set<T>
}

type Queries<T extends number> = { [key in string]: IQuery<T> }

type Archetypes = { [key in string]: { with: number, without?: number } }

export function defineQueries<T extends number>(queries: Queries<T>): Archetypes {
  let archetypes: Archetypes = {};
  for (let [queryName, query] of Object.entries(queries)) {
    let archetypeWith = query.with.values().reduce((a, b) => a + b, 0);
    if (query.without) {
      let archetypeWithout = query.without.values().reduce((a, b) => a + b, 0);
      archetypes[queryName] = { 
        with: archetypeWith,
        without: archetypeWithout
      };
    } else {
      archetypes[queryName] = { with: archetypeWith };
    }
  }
  return archetypes;
}
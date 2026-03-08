import type { NonEmptyTokenArray, QueryResult } from "./utils"

type EachCB<T> = (components: T) => void
export type SystemConstructor<Q extends Record<string, NonEmptyTokenArray>> = abstract new (...args: any[]) => ISystem<Q>

export interface ISystem<Q extends Record<string, NonEmptyTokenArray>> {
  update(time: number): void
  queries: {
    [K in keyof Q]: {
      each(cb: EachCB<QueryResult<Q[K]>>): void
    }
  }
}
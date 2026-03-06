export type Ok<T> = { ok: true, val: T }
export type Err<E> = { ok: false, err: E }
export type Result<T, E> = Ok<T> | Err<E>

export type NoEmptyArray<T> = [T, ...T[]]

export interface IType<T> {
  default(val: T): this;
  isValid(val: unknown): val is T;
}

//export type Token<T> = symbol & { readonly __type?: T };

export type Token<T, N extends string = string> = symbol & { 
  readonly __type?: T,
  readonly __name?: N 
}

export type ComponentSchema = IType<any> | Record<string, IType<any>>

export type ExtractSchema<S> = S extends Token<infer R> ? R : never;

export type InferType<I> = I extends IType<infer T> ? T : never;

export type InferComponent<C> = 
  C extends IType<any> 
    ? InferType<C>                                    
    : { [K in keyof C]: C[K] extends IType<any> ? InferType<C[K]> : never }
/*
export type Val<S> = ExtractSchema<S> extends IType<any>
  ? InferType<ExtractSchema<S>>                                    // forme scalaire → valeur directe
  : { [K in keyof ExtractSchema<S>]: InferType<ExtractSchema<S>[K] extends IType<any> ? ExtractSchema<S>[K] : never> } 
*/
export type Val<S> = ExtractSchema<S> extends infer Schema
  ? Schema extends IType<any>
    ? InferType<Schema>
    : { [K in keyof Schema]: Schema[K] extends IType<any> ? InferType<Schema[K]> : never }
  : never;

export type Strict<T> = T & {
  [K in Exclude<string, keyof T>]?: never;
};
/*
export type ToTokenRegistry<R extends Record<string, ComponentSchema>> = {
  [N in keyof R]: Token<R[N]>;
};

*/
export type ToTokenRegistry<R extends Record<string, ComponentSchema>> = {
  [N in keyof R]: Token<R[N], N & string>
}
//

export type ExtractName<T> = T extends Token<any, infer N> ? N : never;

export type NonEmptyTokenArray = NoEmptyArray<Token<any>>

export type Queries = Record<string, NonEmptyTokenArray>

export type QueryResult<T extends NonEmptyTokenArray> = {
  [K in T[number] as ExtractName<K>]: Val<K>
}

export function isIType(val: unknown): val is IType<any> {
  return typeof val === "object" && val !== null && "isValid" in val;
}

export function ok<T>(val: T): Ok<T> {
  return { ok: true, val }
}

export function err<E>(err: E): Err<E> {
  return { ok: false, err }
}

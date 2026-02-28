export type Ok<T> = { ok: true, val: T }
export type Err<E> = { ok: false, err: E }
export type Result<T, E> = Ok<T> | Err<E>

export interface IType<T> {
  default(val: T): this;
  isValid(val: unknown): val is T;
}

export type Token<T> = symbol & { readonly __type?: T };

export type ExtractSchema<S> = S extends Token<infer R> ? R : never;

export type InferType<I> = I extends IType<infer T> ? T : never;

export type Val<S> = {
  [K in keyof ExtractSchema<S>]: InferType<ExtractSchema<S>[K]>;
};

export type Strict<T> = T & {
  [K in Exclude<string, keyof T>]?: never;
};

export type ToTokenRegistry<R extends Record<string, Record<string, IType<any>>>> = {
  [N in keyof R]: Token<R[N]>;
};

export function ok<T>(val: T): Ok<T> {
  return { ok: true, val }
}

export function err<E>(err: E): Err<E> {
  return { ok: false, err }
}

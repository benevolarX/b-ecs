export type Some<T> = { ok: true, val: T }
export type Err<E> = { ok: false, err: E }
export type Result<T, E> = Some<T> | Err<E>
export type Sym<T> = symbol & { readonly __type?: T };

export function ok<T>(val: T): Some<T> {
  return { ok: true, val }
}

export function err<E>(err: E): Err<E> {
  return { ok: false, err }
}

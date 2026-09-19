export type Ok<T> = { ok: true; val: T };
export type Err<E> = { ok: false; err: E };
export type Result<T, E> = Ok<T> | Err<E>;

export type NoEmptyArray<T> = [T, ...T[]];

export function ok<T>(val: T): Ok<T> {
  return { ok: true, val };
}

export function err<E>(err: E): Err<E> {
  return { ok: false, err };
}

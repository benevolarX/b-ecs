import { err, ok, type Sym, type Result } from "./utils";

export class Manager<U> {

  #data: Map<Sym<U>, U>
  #names: Set<string>

  constructor() {
    this.#data = new Map<Sym<U>, U>()
    this.#names = new Set<string>();
  }

  define<T extends U>(name: string, val: T): Result<Sym<T>, "deja defini"> {
    if (this.#names.has(name)) {
      return err("deja defini")
    }
    const id: Sym<T> = Symbol(name) as Sym<T>;
    this.#names.add(name)
    this.#data.set(id, val)
    return ok(id);
  }

  get<T extends U>(id: Sym<T>): Result<T, "not found"> {
    let val = this.#data.get(id)
    return val != undefined ? ok(val as T) : err("not found");
  }

  remove<T extends U>(id: Sym<T>): boolean {
    if (id.description) {
      this.#names.delete(id.description)
    }
    return this.#data.delete(id)
  }

  clear() {
    this.#data.clear()
    this.#names.clear()
  }
}
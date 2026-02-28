import { err, ok, type Token, type Result } from "./utils";

export class Manager<U> {

  #data: Map<Token<U>, U>
  #names: Set<string>

  constructor() {
    this.#data = new Map<Token<U>, U>()
    this.#names = new Set<string>();
  }

  define<T extends U>(name: string, val: T): Result<Token<T>, "deja defini"> {
    if (this.#names.has(name)) {
      return err("deja defini")
    }
    const id: Token<T> = Symbol(name) as Token<T>; //[typeof name];
    // Symbol(key) as ComponentSymbols<T>[typeof key];

    this.#names.add(name)
    this.#data.set(id, val)
    return ok(id);
  }

  get<T extends U>(id: Token<T>): Result<T, "not found"> {
    let val = this.#data.get(id)
    return val != undefined ? ok(val as T) : err("not found");
  }

  remove<T extends U>(id: Token<T>): boolean {
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
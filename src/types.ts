import type { IType } from "./utils";

// export type Bitmask = bigint;

class NumberType implements IType<number> {
    
  #default_val: number = 0;
  #min_val: number|null = null;
  #max_val: number|null = null;

  default(val: number): this {
    this.#default_val = val;
    return this;
  }

  isValid(val: unknown): val is number {
    if (typeof val != "number") {
      return false
    }
    if (this.#min_val != null && this.#min_val > val) {
      return false;
    }
    if (this.#max_val != null && this.#max_val < val) {
      return false;
    }
    return true;
  }

  min(val: number) {
    this.#min_val = val;
    return this;
  }

  max(val: number) {
    this.#max_val = val;
    return this;
  }

}

class BooleanType implements IType<boolean> {
  #default_val: boolean = false;

  default(val: boolean): this {
    this.#default_val = val;
    return this;
  }

  isValid(val: unknown): val is boolean {
    return true;
  }

}

class StringType implements IType<string> {
  #default_val: string = "";
  #min_len: number|null = null;
  #max_len: number|null = null;

  default(val: string): this {
    this.#default_val = val;
    return this;
  }

  isValid(val: unknown): val is string {
    if (typeof val != "string") {
      return false;
    }
    if (this.#min_len != null && val.length < this.#min_len) {
      return false;
    }
    if (this.#max_len != null && val.length > this.#max_len) {
      return false;
    }
    return true;
  }

  min(val: number) {
    this.#min_len = val;
    return this;
  }

  max(val: number) {
    this.#max_len = val;
    return this;
  }
  
}

//type TypesList = { [key: string]: IType<any> }

export const Types = {
  number: new NumberType(),
  boolean: new BooleanType(),
  string: new StringType()
} as const;
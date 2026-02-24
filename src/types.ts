export type Bitmask = bigint;

interface IType<T> {
  default(val: T): void;
  isValid(val: T): boolean;
}

class NumberType implements IType<number> {
  
  #default_val: number = 0;
  #min_val: number|null = null;

  default(val: number): void {
    this.#default_val = val;
  }

  isValid(val: number): boolean {
    if (this.#min_val != null && this.#min_val > val) {
      return false;
    }
    return true;
  }

  min(val: number) {
    this.#min_val = val;
  }

}

class BooleanType implements IType<boolean> {
  #default_val: boolean = false;

  default(val: boolean): void {
    this.#default_val = val;
  }

  isValid(val: boolean): boolean {
    return true;
  }

}

class StringType implements IType<string> {
  #default_val: string = "";

  default(val: string): void {
    this.#default_val = val;
  }

  isValid(val: string): boolean {
    return true;
  }
  
}

//type TypesList = { [key: string]: IType<any> }

export const Types = {
  number: new NumberType(),
  boolean: new BooleanType(),
  string: new StringType()
} as const;
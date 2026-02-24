export type EntityID = number;

export class EntityManager {
  private next: EntityID = 0;
  private free: EntityID[] = [];

  create(): EntityID {
    return (this.free.length > 0 ? this.free.pop()! : this.next++) ;
  }

  destroy(entity: EntityID): void {
    this.free.push(entity);
  }

  reset(): void {
    this.next = 0;
    this.free = [];
  }
}
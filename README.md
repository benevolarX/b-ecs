# b-ecs

```ts
import { ecs } from "b-css";

const world = new ecs.World()

const Position = world.defineComponent(
  "position", {
  x: { 
    type: types.Number, 
    default: 0
  },
  y: { 
    type: types.Number, 
    default: 0
  }
})

const Move = world.defineComponent(
  "move", {
  x: { 
    type: types.Number, 
    default: 0
  },
  y: { 
    type: types.Number, 
    default: 0
  }
})

const QueryMove = world.query({ with: [Position, Move], without: [] })

class SystemMove extends world.System({ movable: QueryMove }) {

  exec(cmd, time) {
    this.movable.forEach(id => {
      cmd.setComponent(id, Position, (old) => old + Move[id])
      cmd.removeComponent(id, Move)
    })
  }

}

// sys graph
world.addSystem(SystemMove).before(SystemInput).after(SystemRender)

// clean toggle enable / disable sys with switch scene
world.switchScene("main_menu")
// world.scenes = [{ name: "main_menu", sys: [] }, { name: "game", sys: [] }]

// 1) define components
// 2) define systems
// 3) make scene with name + active systems
// 4) add external phase with cmd to add more entity after load
// 5) define current scene
// 6) run world

// 1) components = name + typed props
const components = defineComponents({
  position: { 
    x: Types.number.default(0), 
    y: Types.number.default(0) 
  },
  direction: { 
    x: Types.number.default(1), 
    y: Types.number.default(0) 
  },
  speed: { 
    v: Types.number.default(0) 
  }
})
// 2) create world 
const world = new World()
// 3) add component 
world.addComponents(components)
// 4) create scene
class InGame extends world.createScene() {
  // ... 
}
// 5) create systems
const Position: symbol = world.components.position // 
const Direction: symbol = world.components.direction
const Speed : symbol = world.components.speed
class MoveSystem extends defineQueries({ movable: { with: [Position, Direction, Speed] } }) {
  update(scene, time, ...params: any[]) {
    const components = scene.components
    for (const entity of this.queries.movable) {
      const direction = components.get(Direction, entity)
      const speed = components.get(Speed, entity)
      components.set(Position, entity, (old) => {
        const dt = time * speed;
        return {
          x: old.x + direction.x * dt,
          y: old.y + direction.y * dt
        }
      })
    }
  }
}
// 6) query => symbol + scene = bitmask
// 7) 
```

/!\ la scène détecte le nombre de composant par système et choisi
d'instancier un manager de bitmask adapté 
1-32 composants : number classique
32-64 composants : number low et number hight
65+ : uint32array 

```ts
type ComponentDefinitions = Record<string, any>;

type ComponentSymbols<T extends ComponentDefinitions> = {
  [K in keyof T]: symbol & { __type?: T[K] };
};

function defineComponents<const T extends ComponentDefinitions>(
  defs: T
): ComponentSymbols<T> {
  const result = {} as ComponentSymbols<T>;

  for (const key in defs) {
    result[key] = Symbol(key) as ComponentSymbols<T>[typeof key];
  }

  return result;
}


// builder 

function defineComponents<const T extends ComponentDefs>(
  defs: T
): ComponentSymbols<T> {
  const result = {} as ComponentSymbols<T>;

  for (const key in defs) {
    result[key] = Symbol(key) as ComponentSymbols<T>[typeof key];
  }

  return result;
}
//
class World<T extends Record<string, symbol>> {
  public readonly components: T;

  constructor(components: T) {
    this.components = components;
  }
}
//
function buildWorld<const T extends Record<string, symbol>>(components: T) {
  return {
    build() {
      return new World<T>(components);
    }
  };
}

// 
for (let i = 0; i < distinctTokens.length; i++) {

  const r = i & 31            // plus rapide que %
  const index = i >> 5        // division par 32
  const bit = 1 << r

  this.tokenToMask.set(token, { index, bit })
}

```

todo : mettre types.object<IType>

refactor ecs for dummies : 
ecsbuilder()
//.getComponentManager()
.defineComponents()
.nextStep()

.getSystemBuilder()
.registerSystem()
.nextStep()

.getSceneManager()
.registerScene()
.defineMainScene()
.nextStep()

.run()

// refactor en fonction only 

# b-ecs

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.7. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

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

```
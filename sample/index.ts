import { createECS } from "../src/index";
//import { Types } from "../src/types"
import * as z from "zod";
//import type { QueryResult, Val } from "../src/utils"
//type Test = QueryResult<[typeof components.position, typeof components.speed]>
//type Test2 = Val<typeof components.position>

// 1) components

const { defineComponents } = createECS();

let componentsSchema = z.object({
  position: z.object({
    x: z.number().default(0),
    y: z.number().default(0),
  }),
  speed: z.number().min(0).default(0),
  direction: z.object({
    x: z.number().default(0),
    y: z.number().default(0),
  }),
});

const { components, world } = defineComponents(componentsSchema);

const defineQueries = world.getDefineQueries();

class MoveSystem extends defineQueries({
  movable: [components.position, components.speed],
}) {
  override update(time: number) {
    this.queries.movable.each((c) => {
      let dt = c.speed * time;
      //this.commandBuffer.set(c, components.position, (pos) => ({ ...pos, x: pos.x + dt));
    });
  }
}

class PlayerSystem extends defineQueries({
  movable: [components.position, components.direction],
}) {
  override update(time: number) {
    this.queries.movable.each((c) => {
      // todo
      let p = c.position;
      let d = c.direction;
      let np = { x: p.x + d.x * time, y: p.y + d.y * time };
    });
  }
}
/*
const { systems, sceneStep } = world.registerSystems({
  move: MoveSystem,
  player: PlayerSystem
})
*/

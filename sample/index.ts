import { createECS } from "../src/ecs"
import { Types } from "../src/types"
import type { QueryResult } from "../src/utils"

// 1) components

const { defineComponents } = createECS()

const { components, world } = defineComponents({
  position: Types.object({
    x: Types.number.default(0),
    y: Types.number.default(0)
  }),
  speed: Types.number.default(0).min(0),
  direction: Types.object({
    x: Types.number.default(0),
    y: Types.number.default(0),
  }),
})

//type Test = QueryResult<[typeof components.position, typeof components.speed]>


const defineQueries = world.getDefineQueries()
/*
class MoveSystem extends defineQueries() {

}*/

//addComponent(3, components.position, { x: 10, y: 10 })
//addComponent(8, components.speed, 1)

// class MoveSystem extends defineQueries({ movable: [components.position, components.speed] })

//world.setComponent(player, new Symbol("position"), { x: 0, y: 0})
// world.components. 

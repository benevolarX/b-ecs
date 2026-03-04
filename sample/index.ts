import { createECS } from "../src/component"
import { Types } from "../src/types"

// 1) components

const { defineComponents, addComponent} = createECS()

const components = defineComponents({
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

addComponent(3, components.position, { x: 10, y: 10 })
addComponent(8, components.speed, 1)

// class MoveSystem extends defineQueries({ movable: [components.position, components.speed] })

//world.setComponent(player, new Symbol("position"), { x: 0, y: 0})
// world.components. 

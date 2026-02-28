import { createECS } from "../src/component"
import { Types } from "../src/types"

// 1) components

const { defineComponents, addComponent} = createECS()

const components = defineComponents({
  position: {
    x: Types.number.default(0),
    y: Types.number.default(0)
  },
  speed: {
    val: Types.number.default(0).min(0)
  },
  direction: {
    x: Types.number.default(0),
    y: Types.number.default(0)
  }
} as const)

addComponent(3, components.position, { x: 3, y: 8 })
addComponent(8, components.speed, {
  val: 0
})

//world.setComponent(player, new Symbol("position"), { x: 0, y: 0})
// world.components. 

// Record<N extends string, symbol & { readonly __type?: Record<T extends string, U extends IType<any>> } >
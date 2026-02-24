import { ECSWorld } from "../src/world"

const world = new ECSWorld()
const player = world.createEntity()
world.setComponent(player, {}, {})
export type defineComponentsParams = Record<string, ComponentDef>

export interface ComponentDef {}

// 
export const defineComponents = (params: defineComponentsParams) => {
  // let components = []
  for (let [name, def] of Object.entries(params)) {
    // const component = defineComponentWithName(name, def)
    // components.push(component)
  }
}
// 1 component = 1 symbol_id
// 1 symbol_id + scene = 1 bitmask
// 
// world.registerComponents(components[])

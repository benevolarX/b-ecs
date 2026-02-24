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

// world.registerComponents(components[])
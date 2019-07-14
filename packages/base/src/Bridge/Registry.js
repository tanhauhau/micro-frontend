// Registry

const registry = {};

export function register(key /*: string */, value) {
  registry[key] = value;
}

export function get(key /*: string */) {
  if (!(key in registry)) {
    throw new Error(`Entry for key='${key}' not found`);
  }
  return registry[key];
}

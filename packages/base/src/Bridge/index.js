import Bridge from './Bridge';

export function initBridge() {
  if (!window.__BRIDGE__) {
    window.__BRIDGE__ = Bridge;
  }
}

export { Bridge };

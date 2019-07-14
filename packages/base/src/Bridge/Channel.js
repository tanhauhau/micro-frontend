// Pub Sub Communication Channel

const listeners /*: {[topic: string]: Function }*/ = {};

export function subscribe(topic /*: string */, subscriber /*: Function */) {
  (listeners[topic] = listeners[topic] || []).push(subscriber);

  return function() {
    const subscriberIndex = listeners[topic].findIndex(subscriber);
    if (subscriberIndex > -1) {
      listeners[topic].splice(subscriberIndex, 1);
    }
  };
}

export function publish(topic /*: string */, message) {
  if (topic in listeners) {
    for (const listener of listeners[topic]) {
      listener(message);
    }
  }
}

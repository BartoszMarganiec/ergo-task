class EventBus
{
  constructor()
  {
    this.subscriptions = {};
  }

  publish(eventType, arg)
  {
    if(!this.subscriptions[eventType])
      return;

    Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach(key => this.subscriptions[eventType][key](arg));
  }

  subscribe(eventType, callback)
  {
    const id = Symbol();

    if(!this.subscriptions[eventType]) {
      this.subscriptions[eventType] = {};
    }

    this.subscriptions[eventType][id] = callback;

    return {
      unsubscribe: () => {
        delete this.subscriptions[exentType][id];
        if(Object.keys(this.subscriptions[eventType]).length === 0) delete this.subscriptions[eventType];
      }
    }
  }
}

const eventBus = new EventBus();

export default eventBus;

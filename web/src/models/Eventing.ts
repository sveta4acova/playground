type Callback = () => void; //() => {} - так ts будет думать, что функция возвращает объект

export class Eventing {
  events: { [key: string]: Callback[]} = {};

  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);
    this.events[eventName] = handlers;
  }

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];

    if (!handlers || !handlers.length) {
      return;
    }

    handlers.forEach(callback => callback());
  }
}

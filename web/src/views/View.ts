import { Model } from '../models/Model';

export abstract class View<T extends Model<K>, K> {
    regions: {[key: string]: Element} = {};

    constructor(public parent: Element, public model: T) {
        this.bindModel();
    }

    regionsMap(): { [key: string]: string } {
      return {};
    }

    onRender(): void {}

    bindModel() {
        this.model.on('change', () => {
            this.render();
        })
    }

    eventsMap(): {[key: string]: () => void} {
      return {};
    }

    abstract template(): string;

    bindEvents(fragment: HTMLDivElement): void {
        const eventsMap = this.eventsMap();

        for (let eventKey in eventsMap) {
            const [eventName, eventElement] = eventKey.split(':');

            fragment.querySelectorAll(eventElement).forEach(element => {
                element.addEventListener(eventName, eventsMap[eventKey]);
            })
        }
    }

    mapRegion(fragment: Element): void {
      const regionsMap = this.regionsMap();

      for(let key in regionsMap) {
          const selector = regionsMap[key];
          const element = fragment.querySelector(selector);

          if (element) {
            this.regions[key] = element;
          }
      }
    }

    render(): void {
        this.parent.innerHTML = '';
        const templateElement = document.createElement('div');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement);
        this.mapRegion(templateElement);

        this.onRender();

        this.parent.append(templateElement);
    }
}
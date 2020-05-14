import { AxiosPromise, AxiosResponse } from 'axios';

interface ModelAttributes<T> {
    set(value: T): void;
    get<K extends keyof T>(key: K): T[K];
    getAll(): T;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private attrs: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {
    }

    get get() {
        return this.attrs.get;
    }

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    set(update: T): void {
        this.attrs.set(update);
        this.events.trigger('change');
    }

    fetch() {
        const id = this.get('id');

        if (!id) {
            throw new Error('Can not set data without an id');
        }

        this.sync.fetch(id).then((response: AxiosResponse) => {
            this.set(response.data);
        })
    }

    save(): void {
        this.sync.save(this.attrs.getAll()).then((response: AxiosResponse) => {
            this.trigger('save');
        }).catch(() => {
            this.trigger('error');
        })
    }
}
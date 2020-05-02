import { Eventing } from './Eventing';

interface UserProps {
  id?: number,
  name?: string; //? значит опционально
  age?: number;
}

export class User {
  public events: Eventing = new Eventing();
  constructor(private data: UserProps){}

  get(propsName: string): (string | number) {
    return this.data[propsName];
  }

  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}

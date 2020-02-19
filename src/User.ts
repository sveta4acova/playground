import faker from 'faker';

export class User {
  name: string;
  location: {
    lat: number;
    lng: number;
  };

  constructor() {
    this.name = faker.name.firstName();
    //мы не пишем this.location.lat, потому, что выше мы определели свойство - это будет объект с полями, но значение присвоено не было
    //т.е. сейчас в this.location лежит не пустой объект, а undefined
    this.location = {
      lat: parseFloat(faker.address.latitude()),
      lng: parseFloat(faker.address.longitude()),
    }
  }

  markerContent(): string {
    return `User name - ${this.name}`;
  }
}

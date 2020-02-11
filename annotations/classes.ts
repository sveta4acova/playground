//Класс - это типа план создания объекта с некоторыми полями и методами для представления какой-либо сущности
//private - приватные методы не могут быть вызваны вне класса, его экземплярами, они юзается только внутри
//если в экземпляре перезаписывается метод родителя, то модификатор (private, public, protected) меня нельзя
class Vehicle {
  // color: string = 'red';
  // constructor(color: string) {
  //   this.color = color;
  // }
  //строки выше можно записать сокращенно
  constructor( public color: string) {}


  drive(): void {
    console.log('chugga chugga')
  }

  honk(): void {
    console.log('beep');
  }

  private test(): void {
    console.log('private');
  }

  protected protect():void {
    console.log('protect');
  }
}

const boat = new Vehicle('blue');
console.log(`boat color - ${boat.color}`);

class Car extends Vehicle {
  //color не надо опять прописывать тип public, это в Vehicle есть
  constructor(public wheels: number, color: string) {
    super(color);
  }

  drive(): void {
    this.setVin();
    //не получится, это приватный метод и вызывать его в экземплярах класса нельзя
    //this.test();
    console.log('vroom');
  }

  private setVin(): void {
    console.log('set vin number before drive');
  }
}

const audi = new Car(4,'black');
audi.drive();
audi.honk();
console.log(audi.color, audi.wheels);
//не получится, т.к. protect - это protected method и вызывать его можно только внутри класса и его экземпляров
//audi.protect();

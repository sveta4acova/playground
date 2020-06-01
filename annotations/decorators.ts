@classDecorator
class Boat {
  @testDecorator
  color: string = 'black';

  get formattedColor(): string {
    return `This boat color is ${this.color}`;
  }

  // @logError('Something bad!')
  @logError
  pilot(@parameterDecorator speed: string, @parameterDecorator generateWake: boolean): void {
    throw new Error();
  }
}

function classDecorator(constructor: typeof Boat ) {
  console.log(constructor, 'classDecorator');
}

function parameterDecorator(target: any, key: string, index: number) {
  console.log(key, index, 'parameterDecorator');
}

function testDecorator(target: any, key: string): void {
  console.log(target, key, 'testDecorator');
}

function logError(target: any, key: string, desc: PropertyDescriptor): void {
  const method = desc.value;

  desc.value = function () {
    try {
      method();
    } catch(e) {
      console.log('Something went wrong');
    }
  }
}

//decorator factory
// function logError(errorMessage: string) {
//   return function (target: any, key: string, desc: PropertyDescriptor): void {
//     const method = desc.value;
//
//     desc.value = function () {
//       try {
//         method();
//       } catch(e) {
//         console.log(errorMessage);
//       }
//     }
//   }
// }

// const myBoat = new Boat();
// myBoat.pilot();

//что происходит, когда добавляем @testDecorator к свойству/методу
// testDecorator(Boat.prototype, 'pilot');

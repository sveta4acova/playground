import 'reflect-metadata';

const plane = {
  color: 'red',
};

//метадата что-то типа секретной информации для объекта,
//с которым мы ее свяжем
//метадата является ссылкой на другой объект, который и содержит эту инфу
Reflect.defineMetadata('note', 'hi there', plane);
Reflect.defineMetadata('height', 10, plane);
//эта инфа как бы не видима, если вывести в консоль объект, то ничего не будет видно
console.log(plane, 1);
//ее можно получить так
const note = Reflect.getMetadata('note', plane);
const height = Reflect.getMetadata('height', plane);
console.log(note, height, 2);
//можно связать метадата со свойством объекта
Reflect.defineMetadata('anotherNote', 'another color', plane, 'color');
console.log(plane, Reflect.getMetadata('anotherNote', plane, 'color'), 3);

@printMetadata
class Plane {
  color: string = 'red';

  @markFunction('Some secret info')
  fly(): void {
    console.log('vrrrr');
  }
}

function markFunction(secretInfo: string) {
  return function(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key);
  }
}

//тип таргета другой, если мы собираемся применять декоратор ко всему классу
function printMetadata(target: typeof Plane) {
  for (let key in target.prototype) {
    const secret = Reflect.getMetadata('secret', target.prototype, key);
    console.log(secret, 888);
  }
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret, 'secret');

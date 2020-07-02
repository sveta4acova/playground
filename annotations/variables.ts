(() => {
  //Type annotations
  let apples: number = 10;
  apples = 20;
//ts не даст присвоить значение переменной, которое не относится к соотв.типу
//даже если я этот тип при создании переменной не укажу
// apples = 'apples';
  const speed: string = 'fast';
  const completed: boolean = false;
  const nothing: undefined = undefined;
  const nothingMuch: null = null;
  const parrot: any = 'Kesha';
  let a: boolean | string = false;
  a = true;
  a = 'some string';

//built in objects
  const now: Date = new Date();

//arrays
//массив строк (только строк)
  const colors: string[] = ['blue', 'red', 'green'];
  const myNumbers: number[] = [1, 2, 3];
  const truths: boolean[] = [true, true, false];
  const random: any[] = ['string', 10, true];

//classes
  class Car {}
  const audi: Car = new Car();

//Object literal
  let point: { x: number, y: number } = {
    x: 10,
    y: 15,
  };

//Functions
//(i: number) => void - функция принимает число и ничего не возвращает
  const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
  };

//тут type inference не отрабатывает, ts не может догадаться, какой конкретно тип
//т.к. объявление переменной и присвоение ей значения происходит не на одной строке
//поэтому будет тип any
//этот тип будет везде, где ts не может сообразить какой тип у значения
  let test;
  test = 10;
  test = 'hfhjfj';
})();

enum Colors {Red = 'red', Green = 'green'}
enum Cars {Audi, Bmw}
console.log(Cars[0], Cars.Audi, Colors.Green);

//а тут ошибки нет(
//переменные типа Object позволяют только назначить им любое значение
//типа Object нужно избегать
let test: Object = 6;
//а тут ts ошибку показывает
// let test2: object = 9;


//TS доверься, знаем, что делаем
let someValue: any = 'some string';
let strLength: number = (<string>someValue).length;
//эквивалентно
// let strLength: number = (someValue as string).length;

let notMutateArr: ReadonlyArray<number> = [1,2,3];
notMutateArr.map((item: number) => {
  console.log(item)
});
//не прокатит
//notMutateArr.push(4);

//так не работает, т.к. notMutateArr защищен от изменений
//let mutateArr: number[] = notMutateArr;
//нужно так
let mutateArr = notMutateArr as number[];
mutateArr.push(5);

//ReadonlyArray эффект можно так сделать
let anotherNotMutateArr: readonly number[] = [1,2,3,4];
anotherNotMutateArr.map((item: number) => {
  console.log(item)
});
// anotherNotMutateArr.push(7);

//ts-node variables.ts - выполнить

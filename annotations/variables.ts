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

const str: string = 'Hello';
const isLoading: boolean = true;
const count: number = 4;
const numbers: number[] = [1, 2, 3, 4];
const numbers2: Array<number> = [1, 2, 3, 4];
//определение количества элементов в массиве и их типов (в опред.последовательности)
let words: [number, string] = [1, 'Hello'];
// //не получится переопрделить, т.к. первый элемент массива число, а не строка
// words[0] = 'fhfhh';
words[1] = 'another string';
words[0] = 59;

//массив с разными данными
const arr: any[] = [1, 'hghgh', function(){}];

//кастомные типы
type ID = string | number;
const id1: ID = 1234;
const id2: ID = 'hfhfhhf';
const id3: ID = 4567;

type Special = string | null | undefined;
const login: Special = 'Admin';
const login2: Special = null;

//void значит, что функция ничего не возвращает
function sayMyName(name: string): void {
    console.log(name);
}
sayMyName('Хайзенберг');

//never - для типа значений, которые никогда не встречаются, например, выброс ошибки
function throwError(message: string):never {
    throw new Error(message);
}

//переменную типа any можно переопределить
let variable: any = 67;
variable = 'Hello';
const variableLength: number = variable.length;
console.log(variableLength, 'variableLength');

//перечисление - способ дать более понятные имена наборам значений
enum Color {Red = ' #ff0000', Green = '#33cc33'}
const dangerColor: Color = Color.Red;
console.log(dangerColor, 'dangerColor');

//нумерация с 0
enum Answer {No, Yes}
const answer: Answer = Answer.No;
const answer2: Answer = Answer.Yes;
const answer3: string = Answer[0];
console.log(answer, answer2, answer3, 'answers');

enum NumberWin {First = 60, Second = 30, Third = 12}
const winNumbers: number[] = [NumberWin.First, NumberWin.Second, NumberWin.Third];
console.log(winNumbers, 'winNumbers');

const user: object = {
    login: 'Vasya',
    password: '789'
};

function test() {
    console.log(a);
}
//ES6 выдал бы тут ошибку, т.к. функция обращается к переменной, которая еще не объявлена
//TS этого не делает, a будет равна undefined
test();
let a = 10;

const car = {
    carName: 'BMW',
    model: 'M5'
};
const { carName, model }: { carName: string, model: string } = car;
console.log(carName, model, 'car info');

//b - опционально
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

//интерфейсы могут описывать объекты, функции
//в эту функцию приходит объект user
//в нем обязательно должно быть поле name (если будет больше, то ок)
//возвращает строку
function printUserData(user: {name: string}): string {
    return `Имя пользователя - ${user.name}`;
}
const userObj = {name: 'Petya', age: 20};
console.log(printUserData(userObj), 1);

//можно переписать этот пример, используя интерфейсы
//для того, чтобы описать требуемые и опциональные поля

interface UserData {
    name: string,
    age?: number //опционально
}
function printUserData2(user: UserData): string {
    return `Имя пользователя - ${user.name}`;
}
console.log(printUserData2(userObj), 2);

let anotherArr: number[] = [3, 6, 7, 8];
let readOnlyArr: ReadonlyArray<number> = [1, 2, 3, 4];
//переопределить элементы в таком массиве нельзя
// readOnlyArr[0] = 5;
//можно
let copyReadOnlyArr = readOnlyArr;
//нельзя
// anotherArr = readOnlyArr;

//readonly - для свойств, если нужна переменная только для чтения - это const
interface Point {
    readonly x: number,
    readonly y: number,
}
let point: Point = {
    x: 10,
    y: 10,
};
//свойства только для чтения и определяются 1 раз
// point.x = 20;


interface SquareConfig {
    color?: string;
    width?: number;
    // [propName: string]: any, //указать, если SquareConfig может иметь любое количество других свойств, типы которых нам не важны
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        // Error: Property 'clor' does not exist on type 'SquareConfig'
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
//объекты подвергаются избыточной проверке, поэтому с полем colour ts покажет ошибку
// let mySquareObj = {colour: "black"};
//однако ошибки не будет, если хотя бы одно из свойств совпадет
// let mySquareObj = {colour: "black", width: 100};
//в объекте могут быть и другие свойства, это не вызовет ошибку, если объект занесен в переменную
//если вставить его напрямую в createSquare - будут ошибки
let mySquareObj = {color: "black", opacity: .5};
let mySquare = createSquare(mySquareObj);


interface SearchFunc {
    //функция примет 2 аргумента и вернет булев тип
    (source: string, subString: string): boolean;
}
//тут уже можно типы аргументов и что возвращает функция не указывать
//отработает контекстная типизация
const mySearch: SearchFunc = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
};
console.log('Do I learn TS?', mySearch('Я изучаю TS', 'TS'));

//описываем массив строк при помощи интерфейса
interface ArrayOfString {
    [index: number]: string;
}
let myArray: ArrayOfString = ['orange', 'banana'];
//так не получится, потому, что в массиве не строки, а числа
// const anotherMyArray: ArrayOfString = [1, 2 ,3];
myArray[0] = 'apple';


//интерфейсы описывают публичную сторону класса, но не приватную
interface ClockInterface {
    //свойство класса типа Date
    currentTime: Date;
    //метод класса
    setTime(d: Date): void;
}

class Time implements ClockInterface {
    currentTime = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
}

let myTime = new Time();
myTime.setTime(new Date());
console.log(myTime.currentTime);

interface PersonalData {
    password: number | string,
    codeWord: string
}

//интерфейсы могут дополнять друг друга
interface AllUserData extends UserData, PersonalData {
    lastLogin: Date,
}

//если закомментировать одно из свойств, будет ошибка
let fullUserData: AllUserData = {
    name: 'Anna',
    password: '888jfjf',
    codeWord: 'piter',
    lastLogin: new Date(),
};

//объект комбинация из нескольких типов
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

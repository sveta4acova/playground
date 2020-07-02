//Интерфейс создает новый тип, описывающий имена свойств и типы значений объекта
//Каждый раз, когда мы создаем интерфейс, мы создаем новый тип (кастомный)
//Называют интерфейсы с большой буквы
interface VehicleMode {
  name: string;
  year: number;
  broken: boolean;
  [propName: string]: any; //любое свойство с любым значением
  summary(): string; //функция, которая возвращает строку
}

//объект соответствует типу, созданному интерфейсом, если в нем есть все необходимые свойства, необходимых типов
//не важно, если в объекте больше свойств, чем было описано интерфейсом
//один объект может удовлетворять требованиям большого количества интерфейсов
const civic = {
  name: 'Civic',
  year: 200,
  broken: true,
  summary(): string {
    return `Name - ${this.name}, year - ${this.year}, broken - ${this.broken}`;
  }
};

//интерфейсы предотвращают дублирование
//может быть еще функция, которая будет принимать в кач-ве аргумента vehicle
//и для обеих придется прописывать типы свойств, а свойств может быть очень много
const printVehicle = (vehicle: VehicleMode): void => {
  console.log(vehicle.summary());
};

printVehicle(civic);

//Интерфейсы также способны описывать типы функций
interface PrintFunc {
  (a: string, b: number): void;
}

const printFunc: PrintFunc = (a: string, b: number):void => {
  console.log(`${a} - ${b}`);
}

printFunc('Hello', 123);

//индексируемые типы, поддерживаются string и number
interface IndexableTypes {
  [index: number]: string;
}

const stringArray: IndexableTypes = ['a', 'b'];

//для объекта index - это строка
interface IndexableTypesObj {
  [index: string]: string;
}

const testObj: IndexableTypesObj = {
  color: 'red',
};

let cars: string[] = ['audi', 'bmw', 'mercedes'];
cars.push('volvo');

const all: any[] = [12, true, 'some string'];
const dates: (Date | string)[] = [new Date(), '2020-02-07'];

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
};

//Tuple - тип данных в ts
//порядок важен
//без объекта выше не понятно, что мы в этом массиве храним
//поэтому на практике tuples применяются редко
//tuple - это тип данных, похожий на массив, но количество элементов в нем фиксировано и их тип известен
const pepsi: [string, boolean, number] = ['brown', true, 40];
//уже так не получится
// pepsi[0] = true;

//можно создать type alias
//чтобы было удобно много напитков создавать
type Drink = [string, boolean, number];

const sprite: Drink = ['transparent', true, 40];
const tea: Drink = ['green', false, 0];


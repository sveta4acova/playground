const add = (a: number, b: number): number => {
  return a + b;
};

function divide(a: number, b: number): number {
  return a / b;
}

const multiply = function(a: number, b: number): number {
  return a * b;
};

//если функция ничего не возвращает, используется void
//технически она может возвращать null или undefined
const logger = (message: string): void => {
  console.log(message);
  // return undefined;
  // return null;
};

//never используется тогда, когда есть абсолютная уверенность, что функция ничего не возвращает
const error = (message: string): never => {
  throw new Error(message);
};

const todaysWeather = {
  date: new Date(),
  weather: 'sunny',
};

const logWeather = (weather: { date: Date, weather: string}): void => {
  console.log(weather.date, weather.weather);
};

logWeather(todaysWeather);

const logWeatherES6 = ({ date, weather }: { date: Date, weather: string}): void => {
  console.log(date, weather);
};

logWeatherES6(todaysWeather);

function pickCard(x: object): string;
function pickCard(x: number): number;
function pickCard(x: any): any {
  if (typeof x === 'object') {
    return 'object';
  } else if (typeof x === 'number') {
    return 123;
  }
}

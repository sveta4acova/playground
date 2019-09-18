import {random} from '../../../utils/helpers';
import shortid from 'shortid';

const todosExample = [
  'Погладить кота',
  'Зашить носки',
  'Прыгнуть с парашютом',
  'Покормить попугая',
  'Научиться играть на пианино',
  'Набить татуху',
  'Пропить зарплату',
  'Подарить маме цветы',
];

const createTodos = (count) => {
  let todos = [];
  for (let i = 0; i < count; i++) {
    todos.push({
      id: shortid.generate(),
      value: todosExample[random(0,7)],
      isCompleted: random(1,4) % 2 === 0,
    })
  }

  return todos;
};

export default createTodos;
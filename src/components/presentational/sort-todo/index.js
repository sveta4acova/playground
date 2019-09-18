import React from 'react';
import Button from '../button';
import './styles.scss';

const SortTodo = ({onSort}) => {
  console.log('render SortTodo component');
  return (
    <div className="SortTodo">
      <h2 className="SortTodo__caption">Сортировать по:</h2>
      <div className="SortTodo__buttons">
        <Button onClick={() => onSort('value')}>Алфавиту</Button>
        <Button onClick={() => onSort('isCompleted')}>Статусу</Button>
      </div>
    </div>
  );
};

export default SortTodo;
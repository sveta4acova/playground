import React from 'react';
import './styles.scss';

const TodoItem = ({id, value, isCompleted, onToggleTodo}) => {
  console.log('render TodoItem component');
  return <li className={`TodoItem ${isCompleted ? 'TodoItem_through' : ''}`} onClick={() => onToggleTodo(id)}>{value}</li>;
};

export default TodoItem;
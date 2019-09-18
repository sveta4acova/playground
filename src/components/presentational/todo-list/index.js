import React from 'react';
import TodoItem from '../todo-item/index';
import './styles.scss';

const TodoList = ({todos, onToggleTodo}) => {
  console.log('render TodoList component');
  return (
    <ul className="TodoList">
      {todos.map(({...props}) => (
        <TodoItem key={props.id} {...props} onToggleTodo={onToggleTodo}/>
      ))}
    </ul>
  );
};

export default TodoList;
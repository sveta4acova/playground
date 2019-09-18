import React from 'react';
import Input from '../input';
import Button from '../button';
import './styles.scss';

const AddTodo = ({value, onChangeTodoInput, onCreateTodo}) => {
  console.log('render AddTodo component');
  return (
    <div className="AddTodo">
      <Input type="text" value={value} onChange={onChangeTodoInput} placeholder="Введите задачу"/>
      <Button onClick={onCreateTodo}>Создать</Button>
    </div>
  );
};

export default AddTodo;
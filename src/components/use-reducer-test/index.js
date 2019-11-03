import React, {useReducer} from 'react';

const date = new Date();
const initState = {
  count: 0,
  date: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
  multiple: 0,
};
//Если вернуть то же значение из редюсера хука, что и текущее состояние, React выйдет без перерисовки дочерних элементов или запуска эффектов.
const reducer = (state, action) => {
  switch(action.type) {
    case 'inc':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'dec':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'updateDate':
      const newDate = new Date();
      return {
        ...state,
        date: `${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`,
      };
    default:
      return state;
  }
};

const UseReducerTest = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <>
      Counter: {state.count}
      <button onClick={() => dispatch({type: 'inc'})}>Increase</button>
      <button onClick={() => dispatch({type: 'dec'})}>Decrease</button>
      Double
      Date: {state.date}
      <button onClick={() => dispatch({type: 'updateDate'})}>Update time</button>
    </>
  );
};

export default UseReducerTest;
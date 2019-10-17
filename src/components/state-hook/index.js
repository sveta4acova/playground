import React, {useState} from 'react'; //хук состояния импортим

const StateHook = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{`Вы кликнули ${count} раз(а)`}</p>
      <button onClick={() => setCount(count + 1)}>Клик!</button>
    </div>
  );
};

export default StateHook;
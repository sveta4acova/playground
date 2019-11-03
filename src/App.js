import React, {useState, useRef, useCallback, useEffect} from 'react';
import Counter from './components/counter';
import UseReducerTest from './components/use-reducer-test';
import Ref from './components/ref';
import ChildComponent from './components/child-component';
import ReactMemoTest from './components/react-memo-test';
import ReactUseMemoTest from './components/react-use-memo-test';
import Button from './components/button';
import {ThemeContext, themes} from './context';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [login, setLogin] = useState('Petya');
  const [pass, setPass] = useState('Password');
  const [countHello, setCountHello] = useState(0);
  const [visibilityCounter, setVisibilityCounter] = useState(true);
  const [callbackCount, setCallbackCount] = useState(0);
  const [memoCount, setMemoCount] = useState(0);
  const field = useRef();
  let functions = new Set();

  //при изменении состояния ChildComponent будет перерендериваться, хотя нам это не нужно
  // const callbackFunction = () => callbackCount;
  //поэтому нужно применить useCallback к функции, которую мы хотим передать в дочерний компонент
  //он будет перерендериваться если изменятся зависимости (те, что в массиве вторым аргументом)
  //useCallback предотвращает создание функции при каждом ререндере, это произойдет при изменении зависимости
  const callbackFunction = useCallback(() => {
    // чето тут делаем с callbackCount ...
    return callbackCount;
  }, [callbackCount]);

  const increment = useCallback(n => {
    //тут нужно использовать стрелочную функцию, чтобы постоянно новое значение получать (форму функционального обновления хука)
    //с countHello в зависимостях функция всегда создавалась бы заново
    setCountHello(countHello => countHello + n);
  }, []);

  useEffect(() => {
    //этот код выполнится всего один раз, когда компонент монтируется
    //setCountHello обновляет стейт, но т.к. зависимостей нет он не будет реагировать на эти обновления
    //а значит в переменной countHello будет ее изначальное значение, т.е. 0
    //можно исправить это добавив countHello в список зависимостей
    //но тогда мы будем постоянно сбрасывать счетчик
    // const id = setInterval(() => {
    //   setCountHello(countHello + 5);
    // }, 1000);
    // return () => clearInterval(id);

    //нужно применить форму функционального обновления хука setState
    // const id = setInterval(() => {
    //   setCountHello(c => c + 5);
    // }, 1000);
    // return () => clearInterval(id);
  }, []);


  return (
    <ThemeContext.Provider value={themes[theme]}>
      <div className="App">
        <header className="App-header">
          {/*{visibilityCounter && <Counter/>}*/}
          {/*<button onClick={() => setVisibilityCounter(!visibilityCounter)}>{`${visibilityCounter ? 'Скрыть' : 'Показать'} счетчик`}</button>*/}
          {/*<div>*/}
            {/*<button onClick={() => setTheme('dark')}>Цвет текста синий</button>*/}
            {/*<button onClick={() => setTheme('light')}>Цвет текста серый</button>*/}
          {/*</div>*/}

          {/*<UseReducerTest/>*/}

          {/*<div>*/}
            {/*<Ref ref={field} />*/}
            {/*<button onClick={() => field.current.focus()}>Фокус на поле вне компонента Ref</button>*/}
          {/*</div>*/}

          {/*<div>*/}
            {/*<ChildComponent action={callbackFunction} />*/}
            {/*<button onClick={() => setCallbackCount(callbackCount + 1)}>*/}
              {/*Change callback count*/}
            {/*</button>*/}
          {/*</div>*/}

          {/*<ReactMemoTest theme={theme} />*/}

          {/*<ReactUseMemoTest/>*/}


          {/*Еще один пример по useCallback*/}
          <div>
            <Button increment={increment}/>
            <p>count: {countHello}</p>
          </div>
        </header>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

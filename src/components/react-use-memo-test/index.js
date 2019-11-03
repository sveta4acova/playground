import React, {useState, useMemo} from 'react';

const ReactUseMemoTest = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['hey', 'banana', 'may', 'parrot', 'may', 'hello', 'hello'];
  const word = words[wordIndex];
  const calculateLength = word => {
    //будет повторно вычислять мемоизированное значение только тогда, когда значение какой-либо из зависимостей изменилось
    //значение для второго слова may будет вычисляться повторно, т.к. значение зависимости word изменилось
    //а вот для hello - нет (зависимость не изменилась)
    console.log('calculateLength');
    let i = 0;
    while (i < 10000) i++;
    return word.length;
  };

  //в зависимостях то же, что и в аргументах
  const length = useMemo(() => calculateLength(word), [word]);

  return (
    <>
      <p>{word} length - {length}</p>
      <button onClick={() => {
        const next = wordIndex + 1 === words.length ? 0 : wordIndex + 1;
        setWordIndex(next);
      }}>Next word</button>
    </>
  );
};

export default ReactUseMemoTest;
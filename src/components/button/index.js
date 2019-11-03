import React from 'react';

const Button = ({increment}) => (
  <>
    <button onClick={() => increment(5)}>Hello</button>
  </>
);

export default React.memo(Button);

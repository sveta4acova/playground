import React, {useEffect} from 'react';

const ReactMemoTest = ({ theme }) => {
  useEffect(() => {
    console.log('rerender ReactMemoTest')
  });

  return (
    <>
      <p>Current theme: {theme}</p>
    </>
  );
};

export default React.memo(ReactMemoTest);
import React, {useState, useEffect} from 'react';

const ChildComponent = ({action}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log('useEffect in ChildComponent');
    let val = action();
    setValue(val);
  }, [action]);

  return(
    <>
      Child : {value}
    </>
  )
};

export default ChildComponent;

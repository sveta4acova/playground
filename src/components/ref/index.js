import React, {useRef, useImperativeHandle, forwardRef} from 'react';

const Ref = (props, ref) => {
  const field = useRef();
  //этот хук позволит нам поставить фокус в поле из родительского компонента Ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      field.current.focus();
    }
  }));

  return (
    <>
      <input type="text" ref={field} />
      <button onClick={() => field.current.focus()}>Фокус</button>
    </>
  );
};

export default forwardRef(Ref);
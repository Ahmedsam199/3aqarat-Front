import React, { useState, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
const RowEffected = ({
  index,
  methods,
  arrayName,
  propName,
  defaultValue = '',
  timeOut = 0,
  isWork = true,
}) => {
  const [state, setState] = useState(defaultValue);
  const { control } = useFormContext();
  const timeID = useRef(null);
  const prevStateRef = useRef();
  const _state = useWatch({
    control,
    name: `${arrayName}.${index}.${propName}`,
    defaultValue: '',
  });
  useEffect(() => {
    prevStateRef.current = state;
  }, [state]);
  if (isWork && _state === state && state !== prevStateRef.current) {
    clearTimeout(timeID.current);
    timeID.current = setTimeout(() => {
      methods.reduce(async (promise, sync) => {
        await promise;
        sync(index);
      }, Promise.resolve());
    }, timeOut);
  }
  if (_state === undefined || _state === '' || _state === state) {
    return null;
  }
  setState(_state);
  return null;
};

export default React.memo(RowEffected);

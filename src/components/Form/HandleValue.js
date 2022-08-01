import React, { useEffect } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';
function HandleValue({
    name,
    onChange = null,
    defaultValue
}) {
    const { control, register } = useFormContext();
    const val = useWatch({ control, name });
    useEffect(() => {
        onChange?.()
    }, [val])
    return (
        <input className="d-none" {...register(`${name}`)} defaultValue={defaultValue} />
    );
}

export default React.memo(HandleValue);

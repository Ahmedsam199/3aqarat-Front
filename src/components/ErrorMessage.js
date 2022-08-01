import { t } from 'i18next';
import React from 'react';
const generateName = ({ propName, arrayName = 'Array', index = 0 }) => `${!!propName ? `${t(arrayName)}[${index + 1}]${t(propName)} ` : ""}`
export const ErrorMessage = ({ arrayName, index, propName, error }) => {
    return !error ?
        null :
        typeof error === 'string' ? <small className="text-danger" > {`${generateName({ arrayName, index, propName })}${t(error)}`} </small> :
            < small className="text-danger">{`${generateName({ arrayName, index, propName })}${t(error.key, error.values)}`}</small>
};

import '@styles/react/libs/react-select/_react-select.scss';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
const CustomSelect =
    ({
        url,
        value,
        data,
        textName = "label",
        valueName = "value",
        groups = [],
        className,
        onChange,
        placeholder,
        customName,
        customValue,
        isDisabled,
        ignoreSeries,
        ...rest
    }, ref) => {
        const [loading, setLoading] = useState(true);
        const [options, setOptions] = useState([]);
        const [val, setVal] = useState(value);
        const { t } = useTranslation()
        const generateOptions = useCallback((o) => {
            return groups.map(x => {
                return ({
                    label: x.label,
                    options: o.filter(x.filter)
                })
            })
        }, [
            groups,
            valueName,
            textName,
            customName,
            customValue,
            isDisabled,
        ]);
        const makeOptions = useCallback(() => {
            const _options = ignoreSeries ? data.filter(x => ignoreSeries.findIndex(y => y === x.Series) === -1) : data;
            setOptions(generateOptions(_options));
        }, [data, ignoreSeries])
        useEffect(() => {
            makeOptions()
            setLoading(false);
        }, [data]);
        return (
            <Select
                isDisabled={isDisabled}
                className={'react-select ' + className}
                classNamePrefix="select"
                isLoading={loading}
                isOptionDisabled={(option) => option.isDisabled} // disable an option
                getOptionValue={(option) => option[`${valueName}`]} // disable an option
                getOptionLabel={(option) => option[`${textName}`]} // disable an option
                options={options}
                value={val ?? null}
                formatGroupLabel={formatGroupLabel}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e);
                        setVal(e ?? null)
                    }
                }}
                {...rest}
            />
        );
    }
const formatGroupLabel = data => (
    <div className='d-flex justify-content-between align-center'>
        <strong>
            <span>{data.label}</span>
        </strong>
        <span>{data.options.length}</span>
    </div>
)
export default CustomSelect



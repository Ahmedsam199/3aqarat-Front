import '@styles/react/libs/react-select/_react-select.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
const CustomSelect =
    ({
        url,
        value,
        options,
        textName = "label",
        valueName = "value",
        className,
        onChange,
        forceRender,
        afterFetch,
        offlineFunc,
        placeholder,
        customName,
        customValue,
        isDisabled,
        ignoreSeries,
        ...rest
    }, ref) => {
        const [loading, setLoading] = useState(true);
        const [defaultOptions, setDefaultOptions] = useState([]);
        const [val, setVal] = useState(undefined);
        const {t} =useTranslation()
        const fetchData = async () => {
            try {
                const res = await axios.get(url)
                if (res.data && res.data[0].length) {
                    return !!afterFetch ? afterFetch(res.data[0]) : res.data[0];
                }
            } catch (e) {
                console.error("hacker_it error", e)
                return []
            }
        }

        useEffect(() => {
            let _options = !!url ? fetchData() : options;
            setDefaultOptions(_options);
            setLoading(false);
        }, [options]);
        return (
            <Select
                isDisabled={isDisabled}
                className={`react-select mb-1 ${className ?? ""}`}
                classNamePrefix="select"
                isLoading={loading}
                getOptionValue={(option) => option[valueName]}
                getOptionLabel={(option) => option[textName]}
                isOptionDisabled={(option) => option.isDisabled} // disable an option
                options={defaultOptions}
                value={val ?? null}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e);
                        console.log("hacker_it", e)
                        setVal(e)
                    }
                }}
                {...rest}
            />
        );
    }
export default CustomSelect

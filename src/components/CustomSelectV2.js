import '@styles/react/libs/react-select/_react-select.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

function CustomSelect({
  url,
  value,
  options,
  textName,
  valueName,
  className,
  onChange,
  customName,
  customValue,
  customName2,
  customValue2,
  ...rest
}) {
  const [val, setVal] = useState(null);
  const [_options, set_Options] = useState([]);
  const loadOptions = async (search, prevOptions) => {
    let filteredOptions;
    if (!search) {
      filteredOptions = _options;
    } else {
      const searchLower = search?.toLowerCase();

      filteredOptions = _options?.filter(
        (e) =>
          e.label?.toLowerCase().includes(searchLower) ||
          e.value?.toLowerCase().includes(searchLower) ||
          e[customName]?.toLowerCase().includes(searchLower) ||
          e[customName2]?.toLowerCase().includes(searchLower)
      );
    }
    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions?.slice(
      prevOptions.length,
      prevOptions.length + 10
    );
    return {
      options: slicedOptions,
      hasMore,
    };
  };
  const updateValue = (v, ops) => {
    if (value === {} || value === '' || value === undefined) return;
    if (v !== undefined) {
      setVal(ops?.find((x) => x.value === v));
    }
  };
  const fetchOption = async () => {
    if (url) {
      const { data } = await axios.get(url);
      const _ = data?.map((x) => ({
        value: x[valueName],
        label: x[textName],
        [customName]: x[customValue],
        [customName2]: x[customValue2],
      }));
      set_Options(_);
      updateValue(value, _);
    } else if (options) {
      const _ = options?.map((x) => ({
        value: x[valueName],
        label: x[textName],
        [customName]: x[customValue],
        [customName2]: x[customValue2],
      }));
      set_Options(_);
      updateValue(value, _);
    }
  };
  useEffect(() => {
    fetchOption();
  }, [value, url, options]);
  return (
    <AsyncPaginate
      className={'react-select ' + className}
      classNamePrefix="select"
      value={val ?? null}
      loadOptions={loadOptions}
      // cacheUniqs={_options}
      onChange={(e) => {
        setVal(e);
        onChange(e);
      }}
      {...rest}
    />
  );
}

export default CustomSelect;

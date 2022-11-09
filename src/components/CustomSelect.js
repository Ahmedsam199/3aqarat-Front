import "@styles/react/libs/react-select/_react-select.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
const CustomSelect = (
  {
    url,
    value,
    options,
    textName = "label",
    valueName = "value",
    className,
    onChange,
    defaultValue,
    forceRender,
    afterFetch,
    offlineFunc,
    placeholder,
    customName,
    customValue,
    isDisabled,
    ignoreSeries,
    ...rest
  },
  ref
) => {
  const [loading, setLoading] = useState(true);
  const [defualtOptions, setDefualtOptions] = useState([]);
  const [val, setVal] = useState(undefined);
  const { t } = useTranslation();
  const mapOptions = (o) => {
    try {
      return o
        ?.filter((x) => x[valueName] !== undefined)
        .map((x) => {
          return {
            ...x,
            value: x[valueName],
            label: x[textName],
            [customName]: x[customValue],
            isDisabled: x.isDisabled,
          };
        });
    } catch (e) {
      console.error("hacker_it error", e);
      return [];
    }
  };
  const updateValue = (v, ops) => {
    if (value === {} || value === "" || value === undefined) return;
    if (v !== undefined) {
      setVal(ops?.find((x) => x.value === v));
    }
  };

  useEffect(async () => {
    // sleep(0).then(async () => {
    let _options = options;
    if (url != undefined) {
      const _result = await axios.get(url, null, offlineFunc);
      if (_result && _result.data && _result.data[0].length) {
        _options = _result.data[0];
      }
    }
    if (url && afterFetch && _options.length > 0)
      _options = afterFetch(_options);
    if (ignoreSeries) {
      _options = _options.filter(
        (x) => ignoreSeries.findIndex((y) => y === x.Series) === -1
      );
    }
    _options = mapOptions(_options);
    updateValue(value, _options);
    setDefualtOptions(_options);
    setLoading(false);
    // });
  }, [value, forceRender, options, ignoreSeries]);

  return (
    <Select
      isDisabled={isDisabled}
      className={"react-select " + className}
      classNamePrefix="select"
      isLoading={loading}
      defaultValue={defaultValue}
      isOptionDisabled={(option) => option.isDisabled} // disable an option
      getOptionLabel={(option) =>
        t(option.label, { defaultValue: option.lable })
      }
      options={defualtOptions}
      value={val ?? null}
      onChange={(e) => {
        if (onChange) {
          onChange(e);
        }
      }}
      {...rest}
    />
  );
};
export default CustomSelect;

import { checkDateFromRange, isEmpty, isObjEmpty } from "@utils";
import axios from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { useTranslation } from "react-i18next";
import { Spinner } from "reactstrap";
const CustomTable = forwardRef(
  (
    {
      columns,
      filters = {},
      url,
      offlineData,
      paginationServer,
      handleClickEvent,
      loadStyle = "normal",
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    // const [totalRows, setTotalRows] = useState(0);
    const [originalData, setOriginalData] = useState([]);

    const _columns = useMemo(() => columns, []);

    useImperativeHandle(ref, () => ({
      refresh: fetchDate,
    }));

    const fetchDate = async () => {
      try {
        setLoading(true);
        // !back
        const response = await axios.get(url, null);
        if (response) {
          const { data } = response;
          if (data) {
            setData(response.data[0]?.filter((e) => e.Series !== undefined));
            setOriginalData(
              response.data[0]?.filter((e) => e.Series !== undefined)
            );
          } else {
            setData([]);
            setOriginalData([]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("hacker_it", error);
      }
    };

    useEffect(() => {
      if (offlineData === undefined) fetchDate();
      else {
        setLoading(true);
        setOriginalData(offlineData);
        setData(offlineData);
        setLoading(false);
      }
    }, [offlineData]);

    useEffect(() => {

      if (isObjEmpty(filters) || filters === undefined || filters === null)
        return;
      let _data = [...originalData];
      _data = _data.filter(function (item) {
        let _result = true;
        for (var key in filters) {
          if (!_result) return false;
          if (typeof filters[key] === "object") {
            if (!isEmpty(filters[key]?.value))
              switch (filters[key]?.op) {
                case "like":
                  _result = item[key]
                    ?.toString()
                    .toLowerCase()
                    .includes(filters[key]?.value.toLowerCase());
                  break;
                case "eq":
                  if (filters[key].value !== "")
                    _result = item[key] === filters[key].value;
                  break;
                case "range":
                  if (
                    !isEmpty(filters[key].value) &&
                    filters[key].value.length === 2
                  ) {
                    const [_, _key] = key.split("_");
                    _result = checkDateFromRange({
                      value: item[_key],
                      range: filters[key].value,
                    });
                  }
                  break;
                default:
                  break;
              }
          } else {
            switch (typeof filters[key]) {
              case "string":
                if (filters[key] !== "")
                  _result = item[key]
                    ?.toString()
                    .toLowerCase()
                    .includes(filters[key].toLowerCase());
                break;
              case "function":
                _result = filters[key](item[key]);
                break;
            }
          }
        }
        return _result;
      });
      setData(_data);
    }, [filters, originalData]);

    return (
      <DataTable
        noHeader
        pagination
        paginationServer={paginationServer}
        striped
        columns={_columns}
        paginationPerPage={10}
        onRowClicked={handleClickEvent}
        // paginationTotalRows={totalRows}
        // paginationRowsPerPageOptions={10}
        className="react-dataTable"
        progressPending={loading}
        progressComponent={(() => {
          if (loadStyle === "spinner")
            return (
              <Spinner
                size="xl"
                color="secondary"
                style={{ width: "10rem", height: "10rem" }}
                className="float-left"
              />
            );
          else return <h3 className="p-5">{t("Loading...")}</h3>;
        })()}
        sortIcon={<ChevronDown size={10} />}
        data={data}
      />
    );
  }
);

export default CustomTable;

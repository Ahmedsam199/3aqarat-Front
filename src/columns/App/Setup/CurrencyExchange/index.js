import RowActions from "@Component/RowActions";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete, CurrencyMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-13"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
  const ReadCurrency = (row) => {
    return CurrencyMap?.get(row.FromCurrency)?.CurrencyName;
  };
  const ReadCurrency2 = (row) => {
    return CurrencyMap?.get(row.ToCurrency)?.CurrencyName;
  };
  const selectors = [
    "Series",
    "Date",
    "RateExchange",
    "FromCurrency",
    "ToCurrency",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 4 }, () => "15%");
  const cells = [
    ...Array.from({ length: 3 }, () => null),
    ReadCurrency,
    ReadCurrency2,
    Actions,
  ];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
    Actions,
  });
};

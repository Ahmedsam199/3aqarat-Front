import RowActions from "@Component/RowActions";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete, PurposeMap, CurrencyMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-6"
      rowId={(row?.Series, row?.ID)}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series, row?.ID)}
    />
  );
  const ReadPurpose = (row) => {
    return PurposeMap?.get(row.Purpose)?.Purpose;
  };
  const ReadCurrency = (row) => {
    return CurrencyMap?.get(row.Currency)?.CurrencyName;
  };
  const selectors = [
    "Series",
    // "Reference",
    "Amount",
    "Currency",
    "Purpose",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [
    ...Array.from({ length: 2 }, () => null),
    ReadCurrency,
    ReadPurpose,
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

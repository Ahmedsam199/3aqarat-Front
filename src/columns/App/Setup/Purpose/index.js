import RowActions from "@Component/RowActions";
import { BooleanColors, PartyTypeOptions } from "@FixedOptions";
import { stringToCapitalize } from "@utils";
import { Badge } from "reactstrap";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete, CurrencyMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-11"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
 const ReadCurrency = (row) => {
   return CurrencyMap?.get(row.DefaultCurrency)?.CurrencyName;
 };
  const readisPaypable = (row) => (
    <Badge color={BooleanColors[row.IsPayable]}>
      {stringToCapitalize(`${row.IsPayable}`)}
    </Badge>
  );
  const selectors = [
    "Series",
    "Purpose",
    "DefaultAmt",
    "IsPayable",
    "DefaultCurrency",
    "Active",
  ];

  const sortable = [...Array.from({ length: 5 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [
    ...Array.from({ length: 3}, () => null),
    readisPaypable,
    ReadCurrency,
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

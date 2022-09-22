import RowActions from "@Component/RowActions";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-13"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
  const selectors = [
    "Series",
    "UserName",
    "Branch",
    "FromDate",
    "ToDate",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [...Array.from({ length: 5 }, () => null), Actions];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
    Actions,
  });
};

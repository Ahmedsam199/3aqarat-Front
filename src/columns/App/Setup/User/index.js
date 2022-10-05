import RowActions from "@Component/RowActions";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete, BranchesMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-14"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
  const ReadBranch = (row) => {
    return BranchesMap?.get(row.Branch)?.BranchName;
  };
  const selectors = [
    "Series",
    "UserName",
    "FromDate",
    "ToDate",
    "Branch",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [...Array.from({ length: 4 }, () => null), ReadBranch, Actions];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
    Actions,
  });
};

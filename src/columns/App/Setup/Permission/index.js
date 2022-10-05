import RowActions from "@Component/RowActions";
import { BooleanColors, PartyTypeOptions } from "@FixedOptions";
import { stringToCapitalize } from "@utils";
import { Badge } from "reactstrap";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete, RolesMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-7"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
  const ReadRoles = (row) => {
    return RolesMap?.get(row.RoleSeries)?.RoleName;
  };
  

  const selectors = ["Series", "RoleSeries", "Active"];
  const sortable = [...Array.from({ length: 2 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 3 }, () => "33.3333%");
  const cells = [...Array.from({ length: 1 }, () => null), ReadRoles, Actions];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
    Actions,
  });
};

import RowActions from "@Component/RowActions";
import { BooleanColors, PartyTypeOptions, GenderOptions } from "@FixedOptions";
import { stringToCapitalize } from "@utils";
import { Badge } from "reactstrap";
import { create, sortSeries } from "../../core";
export default ({ onEdit, onDelete }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-13"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );

  const readGender = (row) => (
    <Badge color={BooleanColors[row.Gender]}>
      {GenderOptions.find((x) => x.value === row.Gender).label}
    </Badge>
  );

  const selectors = [
    "Series",
    "FullName",
    "Phone",
    "Address",
    "Remarks",
    "Gender",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [...Array.from({ length: 5 }, () => null), readGender, Actions];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
    Actions,
  });
};

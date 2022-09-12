import RowActions from "@Component/RowActions";
import { BooleanColors, PartyTypeOptions } from "@FixedOptions";
import { stringToCapitalize } from "@utils";
import { Badge } from "reactstrap";
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
    const readRead = (row) => (
      <Badge color={BooleanColors[row.Read]}>
        {stringToCapitalize(`${row.Read}`)}
      </Badge>
    );
    const readWrite = (row) => (
      <Badge color={BooleanColors[row.Write]}>
        {stringToCapitalize(`${row.Write}`)}
      </Badge>
    );
    const readCreate = (row) => (
      <Badge color={BooleanColors[row.Create]}>
        {stringToCapitalize(`${row.Create}`)}
      </Badge>
    );
    const readDelete = (row) => (
      <Badge color={BooleanColors[row.Delete]}>
        {stringToCapitalize(`${row.Delete}`)}
      </Badge>
    );

  const selectors = ["Series","Active"];
  const sortable = [...Array.from({ length: 2 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 1 }, () => "50%");
  const cells = [
    ...Array.from({ length: 1 }, () => null),
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

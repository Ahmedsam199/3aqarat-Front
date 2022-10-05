import RowActions from "@Component/RowActions";
import { create, sortSeries } from "../../../core";
export default ({ onEdit, onDelete, TerritoryMap, PurposeMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-8"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
  const ReadTerritory = (row) => {
    return TerritoryMap?.get(row?.Territory)?.Territory;
  };
  const ReadPurpose = (row) => {
    return PurposeMap?.get(row?.Purpose)?.Purpose;
  };
  // const readParty = (row) => PartyMap.get(row.Party)?.PartyName;
  const selectors = [
    "Series",
    "RequestedAmt",
    "Territory",
    "Purpose",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [
    ...Array.from({ length: 2 }, () => null),
    ReadTerritory,
    ReadPurpose,
    Actions,
  ];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
  });
};

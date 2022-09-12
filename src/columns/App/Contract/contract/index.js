import RowActions from "@Component/RowActions";
import { BooleanColors, PartyTypeOptions } from "@FixedOptions";
import { stringToCapitalize } from "@utils";
import { Badge } from "reactstrap";
import { create, sortSeries } from "../../../core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export default ({ onEdit, onDelete }) => {
  const { t } = useTranslation();
  const Actions = (row) => (
    <RowActions
      subject="DT-13"
      rowId={(row?.Series, row?.ID)}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series, row?.ID)}
    />
  );
  const readIsRent = (row) => (
    <Badge color={BooleanColors[row.IsRent]}>
      {stringToCapitalize(`${row.IsRent}`)}
    </Badge>
  );
    const readIsSale = (row) => (
      <Badge color={BooleanColors[row.IsSale]}>
        {stringToCapitalize(`${row.IsSale}`)}
      </Badge>
    );
  
  const selectors = [
    "Series",
    "FirstParty",
    "SecondParty",
    "IsSale",
    "IsRent",
    "Active",
  ];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 0 }, () => "25%");
  const cells = [
    ...Array.from({ length: 3 }, () => null),
    readIsSale,
    readIsRent,
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

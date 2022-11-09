import RowActions from "@Component/RowActions";
import {
  BooleanColors2,
  BooleanColors,
  PartyTypeOptions,
  ContractStatus,
} from "@FixedOptions";
import { stringToCapitalize } from "@utils";
import { Badge } from "reactstrap";
import { create, sortSeries } from "../../../core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
export default ({ onEdit, onDelete, PartyMap, StatusValMap }) => {
  const { t } = useTranslation();
  const Actions = (row) => (
    <RowActions
      subject="DT-2"
      rowId={(row?.Series, row?.ID)}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series, row?.ID)}
    />
  );
  const readIsRent = (row) => (
    <Badge color={BooleanColors2[row.IsRent]}>
      {stringToCapitalize(`${row.IsRent}`)}
    </Badge>
  );
  const ReadParty = (row) => {
    return PartyMap?.get(row.FirstParty)?.FullName;
  };
  const ReadParty2 = (row) => {
    return PartyMap?.get(row.SecondParty)?.FullName;
  };
  const readStatus = (row) => (
    <Badge color={BooleanColors2[row.Status]}>
      {stringToCapitalize(`${row.Status}`)}
    </Badge>
  );

  const selectors = ["Series", "Status", "FirstParty", "SecondParty", "Active"];
  const sortable = [...Array.from({ length: 3 }, () => true), false];
  const sortFunctions = [sortSeries, ...Array.from({ length: 3 }, () => null)];
  const minWidths = Array.from({ length: 5 }, () => "20%");
  const cells = [null, readStatus, ReadParty, ReadParty2, Actions];
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions,
    Actions,
  });
};

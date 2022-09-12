import RowActions from "@Component/RowActions"
import { create, sortSeries } from '../../core'
import { BooleanColors } from '@FixedOptions'
import { stringToCapitalize } from "@utils"
import { Badge } from "reactstrap"

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
    'Series',
    "Name",
    "Doctype",
    "CopyCount",
    "IsRtl",
    "IsReceipt",
    "IsDefault",
    "PrintOnSubmit",
    "Active"
  ]
  const readIsRtl = row => <Badge color={BooleanColors[row.IsRtl]}>{stringToCapitalize(`${row.IsRtl}`)}</Badge>
  const readIsReceipt = row => <Badge color={BooleanColors[row.IsReceipt]}>{stringToCapitalize(`${row.IsReceipt}`)}</Badge>
  const readIsDefault = row => <Badge color={BooleanColors[row.IsDefault]}>{stringToCapitalize(`${row.IsDefault}`)}</Badge>
  const readPrintOnSubmit = row => <Badge color={BooleanColors[row.PrintOnSubmit]}>{stringToCapitalize(`${row.PrintOnSubmit}`)}</Badge>

  const sortable = [...Array.from({ length: 9 }, () => true), false]
  const sortFunctions = [sortSeries, ...Array.from({ length: 8 }, () => null)];
  const minWidths = Array.from({ length: 9 }, () => "10%")
  const cells = [
    ...Array.from({ length: 4 }, () => null),
    readIsRtl,
    readIsReceipt,
    readIsDefault,
    readPrintOnSubmit,
    Actions
  ]
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions
  })

}

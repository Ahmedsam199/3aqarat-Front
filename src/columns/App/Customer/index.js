import { BooleanColors, PartyTypeOptions } from '@FixedOptions'
import { stringToCapitalize } from "@utils"
import RowActions from "@Component/RowActions"
import { Badge } from 'reactstrap'
import { create, sortSeries } from '../../core'
export default ({ onEdit, onDelete, CurrencyMap }) => {
  const Actions = (row) => (
    <RowActions
      subject="DT-6"
      rowId={row?.Series}
      onEdit={() => onEdit(row)}
      onDelete={() => onDelete(row?.Series)}
    />
  );
  const readPartyType = row => <Badge color={BooleanColors[row.PartyType]}>{PartyTypeOptions.find(x => x.value == row.PartyType).label}</Badge>
  const readDisabled = row => <Badge color={BooleanColors[row.Disabled]}>{stringToCapitalize(`${row.Disabled}`)}</Badge>
  const readIsDefault = row => <Badge color={BooleanColors[row.IsDefault]}>{stringToCapitalize(`${row.IsDefault}`)}</Badge>
  const readCurrency = (row) => CurrencyMap.get(row.DefaultCurrency)?.Currency
  const selectors = [
    'Series',
    'PartyType',
    'PartyName',
    'DefaultCurrency',
    'Phone',
    'IsDefault',
    'Disabled',
    "Active"
  ]
  const sortable = [...Array.from({ length: 7 }, () => true), false]
  const sortFunctions = [sortSeries, ...Array.from({ length: 7 }, () => null)];
  const minWidths = Array.from({ length: 8 }, () => "12%")
  const cells = [null, readPartyType, null, readCurrency, null, readIsDefault, readDisabled, Actions]
  return create({
    selectors,
    sortable,
    minWidths,
    cells,
    sortFunctions
  })

}

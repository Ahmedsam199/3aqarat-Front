import RowActions from "@Component/RowActions";
import { isEmpty } from '@utils';
import { useTranslation } from "react-i18next";
import { Badge } from 'reactstrap';

export const create = (
    {
        selectors,
        sortable,
        minWidths,
        cells,
        sortFunctions
    }
) => {
    const { t } = useTranslation()
    return selectors.map((name, index) => {
        return {
            name: t(`${Array.isArray(name) ? name[1] : name}`),
            selector: Array.isArray(name) ? name[0] : name,
            sortable: sortable[index],
            minWidth: minWidths[index],
            cell: cells[index],
            sortFunction: sortFunctions[index]
        };
    });
}
export const getSeries = row => isEmpty(row?.Series) ? row.ID : row?.Series
export const sortSeries = (rowA, rowB) => {
    const a = +rowA.Series.split("-")[1];
    const b = +rowB.Series.split("-")[1];

    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
};

export const getDataWithBadge =
    ({ row, name, colors }) =>
        <Badge
            className="text-capitalize"
            color={colors[row[`${name}`]]}
            pill
        >
            {row[`${name}`].toUpperCase()}
        </Badge>

export const getActions = ({ row, name, _onEdit, _onDelete }) => (
    <RowActions
        subject={name}
        rowId={row?.Series}
        onEdit={
            () =>
                _onEdit()
        }
        onDelete={() =>
            _onDelete()
        }
    />
)
import React from 'react';
import { Edit } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Button, UncontrolledTooltip } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RowActions = ({ rowId, onEdit, onDelete }) => {
  const { t } = useTranslation()
  return (
    <>
      <Button
        className="btn-icon mr-1"
        color="flat-primary"
        id={rowId + '-edit-btn'}
        onClick={() => {
          if (onEdit) onEdit(rowId);
        }}
      >
        <Edit size="15" />
      </Button>

      <UncontrolledTooltip target={rowId + '-edit-btn'}>
        {t("Edit")}
      </UncontrolledTooltip>
    </>
  );
};

export default RowActions;

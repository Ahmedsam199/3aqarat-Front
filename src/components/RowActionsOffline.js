import React from 'react';
import { Trash2 } from 'react-feather';
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
        color="flat-danger"
        id={rowId + '-delete-btn'}
        onClick={() => {
          MySwal.fire({
            title: t("DeleteConfirm"),
            html: t("deleteConfirmMessage"),
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-danger ml-1',
            },
            buttonsStyling: false,
            showCancelButton: true,
            cancelButtonText: t("Cancel"),
            confirmButtonText: t("Yes"),
            showLoaderOnConfirm: true,
          }).then((result) => {
            if (result.value && onDelete) onDelete(rowId);
          });
        }}
      >
        <Trash2 size="15" />
      </Button>

      <UncontrolledTooltip target={rowId + '-delete-btn'}>
        {t("Delete")}
      </UncontrolledTooltip>
    </>
  );
};

export default RowActions;

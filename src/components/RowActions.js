import { AbilityContext } from "@src/utility/context/Can";
import React, { useContext } from 'react';
import { Edit, Trash2 } from 'react-feather';
import { useTranslation } from "react-i18next";
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RowActions = ({ rowId, onEdit, onDelete, subject }) => {
  const { t } = useTranslation()
  const ability = useContext(AbilityContext);
  return (
    <>
      {
        <>
          <Button
          
            className="mr-1 btn-icon"
            color="flat-primary"
            id={rowId + '-edit-btn'}
            onClick={() => {
              if (onEdit) onEdit(rowId);
            }}
          >
            <Edit size="15"  />
          </Button>
        </>
      }

      {
        ability.can("delete", subject) &&
        <>
          <Button
            className="mr-1 btn-icon"
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
        </>
      }

    </>
  );
};

export default RowActions;

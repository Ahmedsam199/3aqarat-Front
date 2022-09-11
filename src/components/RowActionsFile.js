import Routes from '@Routes';
import { AbilityContext } from '@src/utility/context/Can';
import fileDownload from 'js-file-download';
import React, { useContext } from 'react';
import { Download, Edit, Eye, Trash2 } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Button, UncontrolledTooltip } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const RowActionsFile = ({
  row,
  onEdit,
  onPreview,
  onDelete,
  onDownload,
}) => {
  const { t } = useTranslation()
  const ability = useContext(AbilityContext);

  const handleDownload = async () => {
    const data = await fetch(`${Routes.Attachments.root}download/${row?.id}`, {
      responseType: "arraybuffer",
    }).then((data) => data.blob());
    console.log(data,"DOWNDATA")
    fileDownload(data, row.name);
  };

  return (
    <>
      {onEdit && (
        <>
          <Button
            className="mr-1 btn-icon"
            color="flat-primary"
            id={'-edit-btn' + row?.Series}
            onClick={() => {
              if (onPreview) onPreview(row?.Series);
            }}
          >
            <Edit size="15" />
          </Button>
          <UncontrolledTooltip target={'-edit-btn' + row?.Series}>
            {t('Edit')}
          </UncontrolledTooltip>
        </>
      )}

      {
        onPreview && (
          <>
            <Button
              className="mr-1 btn-icon"
              color="flat-primary"
              id={'-preview-btn' + row?.Series}
              onClick={() => {
                if (onPreview) onPreview(row?.Series);
              }}
            >
              <Eye size="15" />
            </Button>
            <UncontrolledTooltip target={'-preview-btn' + row?.Series}>
              {t("Preview")}
            </UncontrolledTooltip>
          </>
        )
        // )
      }

      {
        onDownload && (
          <>
            <a onClick={handleDownload}>
              <Button
                className="mr-1 btn-icon"
                color="flat-primary"
                id={'-Download-btn' + row?.Series}
                onClick={() => {
                  if (onDownload) onDownload(row?.Series);
                }}
              >
                <Download size="15" />
              </Button>
              <UncontrolledTooltip target={'-Download-btn' + row?.Series}>
                {t("Download")}
              </UncontrolledTooltip>
            </a>
          </>
        )
        // )
      }

      <Button
        className="mr-1 btn-icon"
        color="flat-danger"
        id={'-delete-btn' + row?.Series}
        onClick={() => {
          MySwal.fire({
            title: t("Delete Confirm"),
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
            if (result.value && onDelete) onDelete(row?.Series);
          });
        }}
      >
        <Trash2 size="15" />
      </Button>
      <UncontrolledTooltip target={'-delete-btn' + row?.Series}>
        {t("Delete")}
      </UncontrolledTooltip>
    </>
  );
};

export default RowActionsFile;

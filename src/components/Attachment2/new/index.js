import React, { useCallback, useEffect, useMemo } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import CustomTable from '../../CustomTable';
import RowActionsFile from '../../RowActionsFile';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { File as FileIcon, UploadCloud } from 'react-feather';
import Swal from 'sweetalert2';
import { AlertTriangle } from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAttachments2,
  deleteAttachments2,
  clearAttachments2,
  setAttachments2,
  replaceSignleAttachment2,
  renameSignleAttachment2,
  replaceMultipleAttachments2,
  renameMultipleAttachments2,
} from '../store/action';

const swalOptions = ({ msg, confirmTxt, denyTxt }) => {
  return {
    title: msg,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: confirmTxt,
    denyButtonText: denyTxt,
    denyButtonColor: 'orange',
  };
};

const index = ({ isModalOpen, handleToggleModel }) => {
  let Attachment2 = useSelector((state) => state.Attachment2);
  const dispatch = useDispatch();

  let attachmentNames = useMemo(
    () => Attachment2?.map((x) => x?.name),
    [Attachment2]
  );

  useEffect(() => {
    return () => dispatch(clearAttachments2());
  }, []);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles?.length > 0) {
        if (acceptedFiles.length === 1) {
          if (attachmentNames.includes(acceptedFiles[0]?.name)) {
            Swal.fire(
              swalOptions({
                msg: 'There is already this file exist!',
                confirmTxt: 'Replace File',
                denyTxt: 'Rename File',
              })
            ).then((result) => {
              if (result.isConfirmed) {
                // Replace Single File
                dispatch(replaceSignleAttachment2(acceptedFiles[0]));
              } else if (result.isDenied) {
                // Rename Signle File
                dispatch(
                  renameSignleAttachment2({
                    attachmentNames,
                    acceptedFile: acceptedFiles[0],
                  })
                );
              }
            });
          } else {
            acceptedFiles[0].Series = uuidv4();

            dispatch(addAttachments2(acceptedFiles[0]));
          }2
        } else {
          // upload mutltiple
          const acceptedFileNames = acceptedFiles.map((file) => file?.name);
          const duplicateNames = attachmentNames.filter((element) =>
            acceptedFileNames.includes(element)
          );

          if (duplicateNames?.length > 0) {
            Swal.fire(
              swalOptions({
                msg: `There is ${duplicateNames?.length} files thats already in this destination!`,
                confirmTxt: 'Replace',
                denyTxt: 'Rename',
              })
            ).then((result) => {
              if (result.isConfirmed) {
                // Replace Multiple Files
                dispatch(
                  replaceMultipleAttachments2({
                    duplicateNames,
                    newFiles: acceptedFiles,
                  })
                );
              } else if (result.isDenied) {
                // Rename Multiple Files
                dispatch(
                  renameMultipleAttachments2({
                    attachmentNames,
                    acceptedFiles,
                  })
                );
              }
            });
          } else {
            acceptedFiles = acceptedFiles.map((x) => {
              x.Series = uuidv4();
              return x;
            });

            dispatch(setAttachments2([...Attachment2, ...acceptedFiles]));
          }
        }
      }
    },
    [Attachment2]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    noClick: true,
    accept: {
      'application/vnd.ms-excel': [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
      'image/gif': [],
      'image/jpeg': [],
      'image/png': [],
    },
  });

  const onDelete = (row) => {
    dispatch(deleteAttachments2(row?.Series));
  };

  const _columns = [
    {
      name: 'File',
      cell: (row) => <p>{row?.name}</p>,
    },
  ];

  _columns.push({
    name: 'activity',
    maxWidth: '165px',
    cell: (row) => (
      <RowActionsFile  row={row} onDelete={() => onDelete(row)} />
    ),
  });

  return (
    <Modal
      size="lg"
      isOpen={isModalOpen}
      toggle={() => handleToggleModel(false)}
    >
      <ModalHeader toggle={() => handleToggleModel(false)}>Gallery</ModalHeader>
      <ModalBody>
        <ModalContainer {...getRootProps()} className="uploadContainer">
          <input {...getInputProps()} />
          {isDragActive && (
            <div className="overlayUploader">
              {isDragAccept && (
                <AcceptDiv>
                  <p>
                    <FileIcon />
                  </p>
                  <p>Drag & Drop files here</p>
                </AcceptDiv>
              )}

              {isDragReject && (
                <RejectDiv>
                  <p>
                    <AlertTriangle />
                  </p>
                  <p>This File Type is not accpeted!</p>
                </RejectDiv>
              )}
            </div>
          )}
          <CustomTable offlineData={Attachment2} columns={_columns} />
        </ModalContainer>
        <h6 style={{ color: "gray" }}>
          <UploadCloud size="20" /> Drop files here to attach or{" "}
          <BrowseText onClick={open}>
            <Button>Browse</Button>
          </BrowseText>
        </h6>
      </ModalBody>
    </Modal>
  );
};

const ModalContainer = styled.div`
  position: relative;

  &:focus {
    border: none !important;
    outline: none !important ;
  }

  .overlayUploader {
    position: absolute;
    top: 0;
    left: 0;
    background-color: blue;
    width: 100%;
    height: 100%;
    z-index: 10;
    background: #000000b8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: white;
  }
`;
const BrowseText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  color: green;
  width: fit-content;
`;

const AcceptDiv = styled.div`
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const RejectDiv = styled.div`
  color: red;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export default index;

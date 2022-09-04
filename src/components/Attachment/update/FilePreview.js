import React from 'react';
import styled from 'styled-components';
// import { shell } from 'electron';
import Routes from '@Routes';

const FilePreview = ({ previewFile, setIsPreviewFile }) => {
  let fileType = previewFile?.FileType;
  let fileOriginaltype = fileType?.split('/')[0];

  // if (fileType == 'application/pdf') {
  //   shell.openPath(`${Routes.Attachments.AmazonS3}/${previewFile.FilePath}`);
  //   setIsPreviewFile(false);
  //   return <p></p>;
  // }

  // if (fileOriginaltype == 'application') {
  //   shell.openPath(
  //     `https://docs.google.com/viewer?url=${Routes.Attachments.AmazonS3}/${previewFile.FilePath}`
  //   );
  //   setIsPreviewFile(false);
  //   return <p></p>;
  // }

  if (fileOriginaltype == 'image')
    return (
      <PreviewConatiner>
        <div className="preview-container">
          <img
            src={`${Routes.Attachments.AmazonS3}/${previewFile?.FilePath}`}
          />
        </div>
        <div className="overlay" onClick={() => setIsPreviewFile(false)}></div>
      </PreviewConatiner>
    );

  return <p></p>;
};

const PreviewConatiner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(34, 34, 34, 0.534);
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    cursor: pointer;
  }

  .preview-container {
    width: 640px;
    height: 600px;
    z-index: 100000;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export default FilePreview;

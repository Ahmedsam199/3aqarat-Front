import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import Label from 'reactstrap/lib/Label';
import styled from 'styled-components';
const Compress = require('compress.js');

import { useTranslation } from 'react-i18next';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#eeeeee';
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;
function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
const Uploader = ({ name, ref, control, setFiles, setOfflineFiles }) => {
  const { t } = useTranslation()
  const onDrop = useCallback(
    (acceptedFiles) => {
      const tempFiles = [];
      console.log('acceptedFiles', acceptedFiles);
      acceptedFiles.map(async (file) => {
        const resizedImage = await compress.compress([file], {
          size: 0.01, // the max size in MB, defaults to 2MB
          quality: 0.1, // the quality of the image, max is 1,
          maxWidth: 300, // the max width of the output image, defaults to 1920px
          maxHeight: 300, // the max height of the output image, defaults to 1920px
          resize: true, // defaults to true, set false if you do not want to resize the image width and height
        });
        //file = resizedImage[0];
        tempFiles.push(
          <li key={resizedImage[0].alt}>
            <img src={`data:image/png;base64,  ${resizedImage[0].data}`} />
            {resizedImage[0].alt} -{' '}
            {Math.round(resizedImage[0].endSizeInMb * 10000) / 10000}MB
          </li>
        );
        setListFiles(tempFiles);
        setFiles(
          new File([_base64ToArrayBuffer(resizedImage[0].data)], 'hhehe')
        );
        setOfflineFiles(file);
        // console.log(
        //   'resizedImage[0]',
        //   new File([_base64ToArrayBuffer(resizedImage[0].data)], 'hhehe')
        // );
      });
    },
    [acceptedFiles]
  );
  const compress = new Compress();
  const [listFiles, setListFiles] = useState(null);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: 'image/*', maxFiles: 1, onDrop });

  useEffect(() => {
    const tempFiles = [];
    console.log('acceptedFiles', acceptedFiles);
    acceptedFiles.map(async (file) => {
      const resizedImage = await compress.compress([file], {
        size: 0.01, // the max size in MB, defaults to 2MB
        quality: 0.1, // the quality of the image, max is 1,
        maxWidth: 300, // the max width of the output image, defaults to 1920px
        maxHeight: 300, // the max height of the output image, defaults to 1920px
        resize: true, // defaults to true, set false if you do not want to resize the image width and height
      });
      file = resizedImage[0];
      tempFiles.push(
        <li key={resizedImage[0].alt}>
          <img src={`data:image/png;base64,  ${resizedImage[0].data}`} />
          {resizedImage[0].alt} -{' '}
          {Math.round(resizedImage[0].endSizeInMb * 10000) / 10000}MB
        </li>
      );
      setListFiles(tempFiles);
      console.log('tempFiles', tempFiles);
    });
  }, [acceptedFiles]);

  return (
    <div>
      <Label>
        {t("Select Image")}
      </Label>
      <Container
        {...getRootProps({
          className: 'dropzone',
          onDrop: (event) => console.log(event.view),
        })}
      >
        <Controller
          name={name}
          ref={ref}
          control={control}
          render={({ onChange }) => (
            <input
              name="img"
              {...getInputProps({
                onChange: (e) => {
                  onChange(e.target.files);
                },
              })}
            />
          )}
        />
        <p>
          {t("Add Your Image")}
        </p>
      </Container>
      <aside className="pt-2">
        <h4>
          {t("Files")}
        </h4>
        <ul>{listFiles}</ul>
      </aside>
    </div>
  );
};

export default Uploader;

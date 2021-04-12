import React from 'react';
import Dropzone, { IFileWithMeta } from 'react-dropzone-uploader';
import colors from '../styles/colors';

interface UploadProps {
  onUploadFiles: Function,
}

const FileUpload: React.FC<UploadProps> = ({ onUploadFiles }) => {
  const onChange = (file: IFileWithMeta, status: string, files: IFileWithMeta[]) => {
    console.log(status);
    console.log(file);
    console.log(files);
    onUploadFiles(files);
  };

  return(
    <Dropzone
      onChangeStatus={onChange}
      accept='image/*'
      maxFiles={3}
      maxSizeBytes={500 * 1024}
      inputContent={(_, extra) => extra.reject ? 'Image files only' : 'Upload'}
      styles={{
        dropzone: { overflow: 'hidden' },
        dropzoneReject: { overflow: 'hidden', backgroundColor: colors.red, borderColor: colors.lightRed, }
      }}
    />
  );
};

export default FileUpload;

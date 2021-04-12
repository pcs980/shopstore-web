import React, { useEffect, useState } from 'react';
import {Upload} from 'antd';

interface UploadProps {
  onUploadFiles: Function,
}

const getBase64 = (img: any, callback: Function) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const FileUpload: React.FC<UploadProps> = ({ onUploadFiles }) => {
  const [files, setFiles] = useState([]);

  const onChange = (info: any) => {
    console.log(JSON.stringify(info));
    setFiles(info.fileList);
  };

  useEffect(() => {
    onUploadFiles(files);
  }, [files, onUploadFiles]);

  const validateUpload = (file: any) => {
    console.log(file.type);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if(!isJpgOrPng) {
      console.log('Select image files');
      return Upload.LIST_IGNORE;
    }

    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      console.log('Select images with less than 1MB');
      return Upload.LIST_IGNORE;
    }

    getBase64(file, (imageUrl = '') => {
      const img = new Image();
      img.src = imageUrl;

      console.log(imageUrl);
      console.log(file);
    });

    return false;
  };

  return (
    <Upload
      name='image'
      listType='picture-card'
      fileList={files}
      onChange={onChange}
      beforeUpload={validateUpload}
    >
      {files.length < 3 && '+ Upload'}
    </Upload>
  );
};

export default FileUpload;

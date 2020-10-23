import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import "./styles.css";

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectedFile, setSelectedFile] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0].name);
      onFileUploaded(acceptedFiles[0]);
    },
    [onFileUploaded]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept=".csv" />
      {selectedFile ? (
        <p>{selectedFile}</p>
      ) : (
        <p>Clique aqui para selecionar o arquivo</p>
      )}
    </div>
  );
};

export default Dropzone;

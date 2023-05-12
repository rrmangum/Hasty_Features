import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";
import fileService from "../../services/fileService";
import "./fileuploaderstyles.css";

// This component requires two sets of props from the parent component.
// You must send a boolean (isMultiple) and a successHandler (handleUploadSuccess) function to this
// component using props.

// The isMultiple property is a boolean that will conditionally render the uploader and allow
// multiple files or not based on the value you pass it.
// isMultiple = True => will allow mutliple files
// isMultiple = false => will only allow single file uploads

// The handleUploadSuccess property is a function that is the parent event handler for file upload success.
// It is connected to onLocalUploadSuccess.

export default function FileUploader(props) {
  const onDrop = useCallback((acceptedFiles) => {
    let formData = new FormData();

    acceptedFiles.forEach((file) => {
      formData.append("file", file);
    });

    fileService
      .uploadFiles(formData)
      .then(onLocalUploadSuccess)
      .catch(onUploadError);
  }, []);

  const onLocalUploadSuccess = (response) => {
    props.handleUploadSuccess(response);
  };

  const onUploadError = (error) => {
    console.log(error);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: props.isMultiple ? 0 : 1,
  });

  return (
    <div>
      <input {...getInputProps()}></input>
      {props.isMultiple ? (
        <div
          className="dropzone file-upload-center file-upload-pointer"
          {...getRootProps()}
        >
          <div>
            <i className="h3 text-muted file-upload-center dripicons-cloud-upload fa-lg" />
            <h5>Drop files here or click to upload</h5>
          </div>
        </div>
      ) : (
        <i
          className="dripicons-cloud-upload file-upload-pointer"
          {...getRootProps()}
        />
      )}
    </div>
  );
}

FileUploader.propTypes = {
  isMultiple: PropTypes.bool.isRequired,
  handleUploadSuccess: PropTypes.func.isRequired,
};

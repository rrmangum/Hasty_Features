import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import toastr from "toastr";
import fileService from "../../services/fileService";

export default function FileLinks(props) {
  const handleFilesView = () => {
    props.onFileViewClicked(props.isDeleted);
  };

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
    props.onUploadSuccess(response);
  };

  const onUploadError = (error) => {
    toastr.error("File upload failed, please try again");
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="page-aside-left">
      <ButtonGroup className="d-block mb-2 btn-group">
        <Dropdown>
          <Dropdown.Toggle className="btn btn-success dropdown-toggle w-100 dropdown-toggle">
            <i className="mdi mdi-plus" /> Create New{" "}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <i className="mdi mdi-folder-plus-outline me-1"></i> Folder
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="mdi mdi-file-plus-outline me-1"></i> File
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="mdi mdi-file-document me-1"></i> Document
            </Dropdown.Item>
            <Dropdown.Item>
              <input {...getInputProps()} />
              <div {...getRootProps()}>
                <i className="mdi mdi-upload me-1"></i> Choose File
              </div>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ButtonGroup>
      <div className="email-menu-list mt-3">
        <Link
          to="https://aws.amazon.com/console/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="mdi mdi-aws font-18 align-middle me-2"></i>
          S3 Bucket
        </Link>
        <Link
          to="https://www.google.com/drive/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="mdi mdi-google-drive font-18 align-middle me-2"></i>
          Google Drive
        </Link>
        <Link
          to="https://www.dropbox.com/login"
          target="_blank"
          rel="noreferrer"
        >
          <i className="mdi mdi-dropbox font-18 align-middle me-2"></i>
          Dropbox
        </Link>
        <Link to="#" onClick={handleFilesView}>
          {props.isDeleted ? (
            <i className="mdi mdi-file font-18 align-middle me-2"></i>
          ) : (
            <i className="mdi mdi-delete font-18 align-middle me-2"></i>
          )}
          {props.isDeleted ? "Active Files" : "Deleted Files"}
        </Link>
      </div>
      <div className="mt-5">
        <h4>
          <span className="badge rounded-pill p-1 px-2 badge-secondary-lighten">
            FREE
          </span>
        </h4>
        <h6 className="text-uppercase mt-3">Storage</h6>
        <div className="my-2 progress-sm progress">
          <div
            role="progressbar"
            className="progress-bar bg-success flex file-manager-progress-bar"
          />
        </div>
        <p className="text-muted font-13 mb-0">7.02GB (46%) of 15GB used</p>
      </div>
    </div>
  );
}

FileLinks.propTypes = {
  isDeleted: PropTypes.bool.isRequired,
  onUploadSuccess: PropTypes.func.isRequired,
  onFileViewClicked: PropTypes.func.isRequired,
};

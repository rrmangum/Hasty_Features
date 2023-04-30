import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import Swal from "sweetalert2";
import Header from "../../components/elements/Header";
import FileLinks from "./FileLinks";
import FileTable from "./FileTable";
import FileTableRow from "./FileTableRow";
import FileGrid from "./FileGrid";
import FileCard from "./FileCard";
import fileService from "../../services/fileService";
import "./filemanagerstyles.css";

const fileDownload = require("js-file-download");

export default function FileManager() {
  const [fileData, setFileData] = useState({
    filesTableComponents: [],
    filesCardComponents: [],
    isDeleted: false,
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    searchQuery: "",
    isTable: true,
  });

  const crumbs = [
    { name: "Apps", path: "/apps" },
    { name: "File Manager", path: "/apps/file" },
  ];

  const syncFileData = () => {
    if (fileData.searchQuery) {
      fileService
        .searchFiles(
          fileData.pageIndex,
          fileData.pageSize,
          fileData.isDeleted,
          fileData.searchQuery
        )
        .then(onGetFilesSuccess)
        .catch(onGetFilesError);
    } else {
      fileService
        .getFiles(fileData.pageIndex, fileData.pageSize, fileData.isDeleted)
        .then(onGetFilesSuccess)
        .catch(onGetFilesError);
    }
  };

  useEffect(() => {
    syncFileData();
  }, [
    fileData.isDeleted,
    fileData.pageIndex,
    fileData.pageSize,
    fileData.searchQuery,
  ]);

  const onGetFilesSuccess = (response) => {
    const filesArray = response.item.pagedItems;
    setFileData((prevState) => {
      const newFileData = { ...prevState };
      newFileData.filesTableComponents = filesArray.map(mapFileTable);
      newFileData.filesCardComponents = filesArray.map(mapFileCard);
      newFileData.totalCount = response.item.totalCount;
      return newFileData;
    });
  };

  const onGetFilesError = (error) => {
    toastr.error("Could not retrieve files, please refresh the page.");
  };

  const handleIsDeleted = () => {
    setFileData((prevState) => {
      const newFileData = { ...prevState };
      newFileData.isDeleted = !prevState.isDeleted;
      newFileData.pageIndex = 0;
      return newFileData;
    });
  };

  const handlePaginationChange = (pageNumber) => {
    setFileData((prevState) => {
      let newFileData = { ...prevState };
      newFileData.pageIndex = pageNumber - 1;
      return newFileData;
    });
  };

  const handleTableView = () => {
    setFileData((prevState) => {
      let newFileData = { ...prevState };
      newFileData.isTable = true;
      newFileData.pageSize = 10;
      return newFileData;
    });
  };

  const handleGridView = () => {
    setFileData((prevState) => {
      let newFileData = { ...prevState };
      newFileData.isTable = false;
      newFileData.pageSize = 20;
      return newFileData;
    });
  };

  const handleUpload = useCallback((response) => {
    if (response.items.length > 1) {
      toastr.success("Files successfully uploaded.");
    } else if (response.items.length === 1) {
      toastr.success("File successfully uploaded.");
    } else {
      toastr.error("File was not uploaded, please try again.");
    }
    syncFileData();
  }, []);

  const handleDeleteFile = useCallback((aFile) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const deleteFileHandler = getSuccessHandler(aFile.id);
        fileService
          .changeFileStatus(aFile.id)
          .then(deleteFileHandler)
          .catch(onFileStatusChangeError);
      }
    });
  }, []);

  const handleRestoreFile = useCallback((aFile) => {
    const restoreFileHandler = getSuccessHandler(aFile.id);
    fileService
      .changeFileStatus(aFile.id)
      .then(restoreFileHandler)
      .catch(onFileStatusChangeError);
    toastr.success("File successfully restored.");
  }, []);

  const getSuccessHandler = (id) => {
    setFileData((prevState) => {
      const newFileData = { ...prevState };
      newFileData.filesTableComponents = [...newFileData.filesTableComponents];
      newFileData.filesCardComponents = [...newFileData.filesCardComponents];

      const indexOfTable = newFileData.filesTableComponents.findIndex(
        (file) => {
          if (file.props.file.id === id) {
            return true;
          }
          return false;
        }
      );
      if (indexOfTable >= 0) {
        newFileData.filesTableComponents.splice(indexOfTable, 1);
      }

      const indexOfCard = newFileData.filesCardComponents.findIndex((file) => {
        if (file.props.file.id === id) {
          return true;
        }
        return false;
      });
      if (indexOfCard >= 0) {
        newFileData.filesCardComponents.splice(indexOfCard, 1);
      }

      return newFileData;
    });
  };

  const onFileStatusChangeError = (error) => {
    toastr.error("File status was not updated, please try again.");
  };

  const handleDownloadFile = useCallback((aFile) => {
    fileDownload(aFile.url, aFile.name);
  });

  //#region - Mappers
  const mapFileTable = (aFile) => {
    return (
      <FileTableRow
        file={aFile}
        key={`List-A ${aFile.id}`}
        isDeleted={fileData.isDeleted}
        onFileDeleteClicked={handleDeleteFile}
        onFileRestoreClicked={handleRestoreFile}
        onFileDownloadClicked={handleDownloadFile}
      />
    );
  };

  const mapFileCard = (aFile) => {
    return (
      <FileCard
        file={aFile}
        key={`List-B ${aFile.id}`}
        isDeleted={fileData.isDeleted}
        onFileDeleteClicked={handleDeleteFile}
        onFileRestoreClicked={handleRestoreFile}
      />
    );
  };
  //#endregion

  const handleSearch = (event) => {
    setFileData((prevState) => {
      let newFileData = { ...prevState };
      newFileData.searchQuery = event.target.value;
      newFileData.pageIndex = 0;
      return newFileData;
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Header title="File Manager" crumbs={crumbs} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="card flex">
            <div className="card-body">
              <FileLinks
                isDeleted={fileData.isDeleted}
                onFileViewClicked={handleIsDeleted}
                onUploadSuccess={handleUpload}
              />
              <div className="page-aside-right">
                <div className="d-flex flex justify-content-between align-items-center">
                  <div className="app-search">
                    <form>
                      <div className="mb-2 pt-2 position-relative">
                        <input
                          type="text"
                          name="searchQuery"
                          className="form-control"
                          placeholder={
                            fileData.isDeleted
                              ? "Search deleted files..."
                              : "Search active files..."
                          }
                          onChange={handleSearch}
                        />
                        <span
                          className="mdi mdi-magnify search-icon pt-2"
                          role="button"
                        ></span>
                      </div>
                    </form>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-light"
                      onClick={handleTableView}
                    >
                      <i className="mdi mdi-format-list-bulleted"></i>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm"
                      onClick={handleGridView}
                    >
                      <i className="mdi mdi-view-grid"></i>
                    </button>
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="mb-3">
                    {fileData.isDeleted ? "Deleted Files" : "Active Files"}
                  </h5>
                  {fileData.isTable ? (
                    <FileTable fileData={fileData} />
                  ) : (
                    <FileGrid fileData={fileData} />
                  )}
                  <Row>
                    <Pagination
                      className="ant-pagination mt-3 file-manager-center"
                      onChange={handlePaginationChange}
                      current={fileData.pageIndex + 1}
                      total={fileData.totalCount}
                      pageSize={fileData.pageSize}
                      locale={locale}
                    />
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

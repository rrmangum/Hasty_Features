import React from 'react';
import PropTypes from 'prop-types';
import { formatDateTime } from '../../utils/dateFormater';
import './filemanagerstyles.css';

export default function FileTableRow(props) {
    let date = new Date(`${props.file.dateCreated}Z`);

    const handleDeleteFile = () => {
        props.onFileDeleteClicked(props.file);
    };

    const handleRestoreFile = () => {
        props.onFileRestoreClicked(props.file);
    };

    const handleFileDownload = () => {
        props.onFileDownloadClicked(props.file);
    };

    return (
        <tr>
            {props.isDeleted ? (
                <td>
                    <button type="button" className="btn btn-light" onClick={handleRestoreFile}>
                        <i className="dripicons-time-reverse"></i>
                    </button>
                </td>
            ) : (
                <td>
                    <button type="button" className="btn btn-light" onClick={handleDeleteFile}>
                        <i className="dripicons-cross"></i>
                    </button>
                </td>
            )}
            <td>
                <button type="button" className="btn btn-light" onClick={handleFileDownload}>
                    <i className="dripicons-cloud-download"></i>
                </button>
            </td>
            <td>
                <span>{props.file.id}</span>
            </td>
            <td>
                <span>{props.file.name}</span>
            </td>
            <td>
                <span>{props.file.type.name}</span>
            </td>
            <td>
                <p className="mb-0">{formatDateTime(date)}</p>
            </td>
            <td>
                <a className="file-manager-url-link" href={props.file.url} target="_blank" rel="noreferrer">
                    {props.file.url}
                </a>
            </td>
        </tr>
    );
}

FileTableRow.propTypes = {
    isDeleted: PropTypes.bool.isRequired,
    file: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        createdBy: PropTypes.number,
        type: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string.isRequired,
        }),
    }).isRequired,
    onFileDeleteClicked: PropTypes.func.isRequired,
    onFileRestoreClicked: PropTypes.func.isRequired,
    onFileDownloadClicked: PropTypes.func.isRequired,
};

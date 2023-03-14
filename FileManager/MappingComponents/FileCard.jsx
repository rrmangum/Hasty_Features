import React from 'react';
import PropTypes from 'prop-types';

export default function FileCard(props) {

    const handleDeleteFile = () => {
        props.onFileDeleteClicked(props.file);
    };

    const handleRestoreFile = () => {
        props.onFileRestoreClicked(props.file);
    };

    return (
        <div
            className="mb-xl-4 mb-lg-3 mb-md-2 mb-sm-2 mb-xs-2 file-card-image-overlay">
            {(props.file.type.name === 'jpeg' || 'png') ? (
                <React.Fragment>
                    <img
                        data-dz-thumbnail=""
                        className="avatar-xl rounded bg-light file-card-image shadow-lg"
                        alt={props.file.name}
                        src={props.file.url}
                        onClick={props.isDeleted ? handleRestoreFile : handleDeleteFile}
                    />
                    <i
                        className={`${
                            props.isDeleted ? 'dripicons-time-reverse' : 'dripicons-cross'
                        } file-card-image-icon`} onClick={props.isDeleted ? handleRestoreFile : handleDeleteFile}></i>
                </React.Fragment>
            ) : (
                <div className="avatar-xl">
                    <span className="avatar-title bg-primary rounded shadow-lg file-card-no-img">{props.file.type.name}</span>
                </div>
            )}
        </div>
    );
}

FileCard.propTypes = {
    isDeleted: PropTypes.bool.isRequired,
    file: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        type: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }),
        dateCreated: PropTypes.string.isRequired,
    }).isRequired,
    onFileDeleteClicked: PropTypes.func.isRequired,
    onFileRestoreClicked: PropTypes.func.isRequired,
};

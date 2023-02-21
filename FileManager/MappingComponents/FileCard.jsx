import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/dateFormater';

export default function FileCard(props) {
    let date = new Date(`${props.file.dateCreated}Z`);

    const handleDeleteFile = () => {
        props.onFileDeleteClicked(props.file);
    };

    const handleRestoreFile = () => {
        props.onFileRestoreClicked(props.file);
    };

    return (
        <div className="mx-n1 g-0 row flex">
            <div className="col-xxl-6">
                <div className="m-1 shadow-none border card flex">
                    <div className="p-2">
                        <div className="row">
                            <div className="col-auto col">
                                {props.file.type.name === 'jpeg' | 'png' ? (
                                    <div className="col-auto">
                                        <img
                                            data-dz-thumbnail=""
                                            className="avatar-sm rounded bg-light"
                                            alt={props.file.name}
                                            src={props.file.url}
                                        />
                                    </div>
                                ) : (
                                    <div className="col-auto">
                                        <div className="avatar-sm">
                                            <span className="avatar-title bg-primary rounded">
                                                {props.file.type.name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="ps-0 col">
                                <a
                                    className="text-muted fw-bold"
                                    href={props.file.url}
                                    target="_blank"
                                    rel="noreferrer">
                                    {props.file.name}
                                </a>
                                <p className="mb-0 mt-1 font-13">{formatDate(date)}</p>
                            </div>
                            <div className="text-end col mt-1">
                                {props.isDeleted ? (
                                    <button type="button" className="btn btn-light" onClick={handleRestoreFile}>
                                        <i className="dripicons-time-reverse"></i>
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-light" onClick={handleDeleteFile}>
                                        <i className="dripicons-cross"></i>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

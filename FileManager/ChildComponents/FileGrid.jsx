import React from 'react';
import PropTypes from 'prop-types';
import './filemanagerstyles.css';

export default function FileGrid(props) {
    return (
        <div className="file-manager-grid-view">
            <div className="mx-n1 g-0 row flex file-manager-grid-view">{props?.fileData?.filesCardComponents}</div>
        </div>
    );
}

FileGrid.propTypes = {
    isDeleted: PropTypes.bool.isRequired,
    fileData: PropTypes.shape({
        filesCardComponents: PropTypes.arrayOf(
            PropTypes.shape({
                props: PropTypes.shape({
                    file: PropTypes.shape({
                        createdBy: PropTypes.number,
                        dateCreated: PropTypes.string.isRequired,
                        id: PropTypes.number,
                        isDeleted: PropTypes.bool,
                        name: PropTypes.string.isRequired,
                        type: PropTypes.shape({
                            id: PropTypes.number,
                            name: PropTypes.string,
                        }),
                        url: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired,
            }).isRequired
        ),
    }).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

export default function FileTable(props) {
    return (
        <div className="table-responsive">
            <table className="table table-centered table-nowrap mb-0 table">
                <thead className="table-light">
                    <tr>
                        <th className="border-0 file-manager-table-action">Action</th>
                        <th className="border-0 file-manager-table-action">Download</th>
                        <th className="border-0">Id</th>
                        <th className="border-0">Name</th>
                        <th className="border-0">Type</th>
                        <th className="border-0">Date Created</th>
                        <th className="border-0">URL</th>
                    </tr>
                </thead>
                {<tbody>{props?.fileData?.filesTableComponents}</tbody>}
            </table>
        </div>
    );
}

FileTable.propTypes = {
    fileData: PropTypes.shape({
        filesTableComponents: PropTypes.arrayOf(
            PropTypes.shape({
                props: PropTypes.shape({
                    file: PropTypes.shape({
                        createdBy: PropTypes.number,
                        dateCreated: PropTypes.string.isRequired,
                        id: PropTypes.number.isRequired,
                        isDeleted: PropTypes.bool,
                        name: PropTypes.string.isRequired,
                        type: PropTypes.shape({
                            id: PropTypes.number,
                            name: PropTypes.string.isRequired,
                        }),
                        url: PropTypes.string.isRequired,
                    }).isRequired,
                }).isRequired,
            })
        ),
    }).isRequired,
};

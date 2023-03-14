import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './filemanagerstyles.css';

export default function FileGrid(props) {
    return (
        <Row xl={5} lg={4} md={3} sm={2} xs={1}>
            {props?.fileData?.filesCardComponents}
        </Row>
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

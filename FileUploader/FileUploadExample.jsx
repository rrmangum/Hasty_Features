import React from 'react';
import { Formik, Form, Field } from 'formik';
import FileUploader from './FileUploader';
import debug from 'sabio-debug';
const _logger = debug.extend('FileUploader');

export default function FileUploadExample() {
    // file upload event handler for single file uploads using Formik - this must be passed to the component as a prop
    // Prop name must be handleUploadSuccess
    const parentHandleSingleUploadSuccess = (response, setFieldValue) => {
        _logger(
            'This data can be found under the FIRST Formik object in the components tab: Hooks -> Formik -> Reducer -> Values:',
            response.items
        );
        setFieldValue('imageId', response.items[0].id);
        setFieldValue('imageName', response.items[0].name);
        setFieldValue('imageUrl', response.items[0].url);
    };

    // formik state values for single file upload
    const singleFileUpload = {
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            imageId: 0,
            imageName: '',
            imageUrl: '',
        },
    };

    // file upload event handler for multiple file uploads using Formik - this must be passed to the component as a prop
    // Prop name must be handleUploadSuccess
    const parentHandleMultipleUploadSuccess = (response, setFieldValue) => {
        _logger(
            'This data can be found under the SECOND Formik object in the components tab: Hooks -> Formik -> Reducer -> Values:',
            response.items
        );
        setFieldValue('files', response.items);
    };

    // formik state values for multiple file uploads
    const MultipleFileUpload = {
        initialValues: {
            name: '',
            propertyAddress: '',
            files: [],
        },
    };

    // file upload event handler for file uploads NOT using Formik - this must be passed to the component as a prop
    // Prop name must be handleUploadSuccess
    const handleUploadSuccessNoFormik = (response) => {
        _logger(
            'This data can be found under the LAST(third) FileUploader object in the components tab: Hooks -> Dropzone -> Reducer -> acceptedFiles:',
            response.items
        );
    };

    return (
        <React.Fragment>
            <div>
                <div className="container">
                    <h3 className="div mt-5">Component renders for single file upload:</h3>
                    <h4 className="mb-2 mt-3">Profile Creation</h4>
                    <div className="row">
                        <div className="col-4">
                            <Formik enableReinitialize={true} initialValues={singleFileUpload.initialValues}>
                                {({ setFieldValue }) => {
                                    return (
                                        <Form>
                                            <div className="form-group mb-2">
                                                <div className="label" htmlFor="firstName">
                                                    First name
                                                </div>
                                                <Field type="text" name="firstName"></Field>
                                                <div className="label" htmlFor="lastName">
                                                    Last name
                                                </div>
                                                <Field type="text" name="lastName"></Field>
                                                <div className="label" htmlFor="email">
                                                    Email
                                                </div>
                                                <Field type="email" name="email"></Field>
                                            </div>
                                            <strong>Upload your avatar image here!</strong>
                                            <FileUploader
                                                isMultiple={false}
                                                handleUploadSuccess={(response) =>
                                                    parentHandleSingleUploadSuccess(response, setFieldValue)
                                                }></FileUploader>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <h3 className="div mt-5">Component renders for multiple file uploads:</h3>
                    <h4 className="mb-2 mt-3">Housing Application</h4>
                    <div className="row">
                        <div className="col-4">
                            <Formik enableReinitialize={true} initialValues={MultipleFileUpload.initialValues}>
                                {({ setFieldValue }) => {
                                    return (
                                        <Form>
                                            <div className="form-group mb-2">
                                                <div className="label" htmlFor="name">
                                                    Name on Housing Application
                                                </div>
                                                <Field type="text" name="name"></Field>
                                                <div className="label" htmlFor="propertyAddress">
                                                    Property Address
                                                </div>
                                                <Field type="text" name="propertyAddress"></Field>
                                            </div>
                                            <strong>Upload your application documents here!</strong>
                                            <FileUploader
                                                isMultiple={true}
                                                handleUploadSuccess={(response) =>
                                                    parentHandleMultipleUploadSuccess(response, setFieldValue)
                                                }></FileUploader>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <h3 className="div mt-5">Component Implementation without Formik wrapper:</h3>
                    <FileUploader isMultiple={true} handleUploadSuccess={handleUploadSuccessNoFormik} />
                </div>
            </div>
        </React.Fragment>
    );
}

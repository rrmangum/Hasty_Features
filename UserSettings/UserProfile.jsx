import React from "react";
import { Container, Card, Tab, Nav, Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { userSettingsSchema } from "../../schemas/userSettingsSchema";
import UserSocialLinks from "./UserSocialLinks";
import toastr from "toastr";
import PropTypes from "prop-types";
import Header from "../../components/elements/Header";
import ProfileCard from "../../components/elements/ProfileCard";
import MilitaryForm from "../../components/military/MilitaryForm";
import CivilianForm from "../../components/civilian/CivilianForm";
import * as userService from "../../services/userService";
import swal from "sweetalert2";
import "toastr/build/toastr.css";
import "./userstyles.css";

export default function UserProfile(props) {
  const user = props.currentUser;
  const navigate = useNavigate();

  const profileData = {
    firstName: user.firstName,
    lastName: user.lastName,
    mi: user.mi,
    avatarUrl: user.avatarUrl,
  };

  const crumbs = [{ name: "Profile", path: "/profile" }];

  const handleForgotPassword = () => {
    userService
      .resetPassword(JSON.parse(`{"email": "${user.email}"}`))
      .then(onResetSuccess)
      .catch(onResetError);
  };

  const onResetSuccess = () => {
    swal.fire(
      "Email Sent!",
      "An email has been sent to you to reset your password.",
      "success"
    );
  };

  const onResetError = () => {
    swal.fire(
      "Error",
      "Reset Failed. Please make sure email is correct & try again.",
      "error"
    );
  };

  const determineRoute = () => {
    if (user.roles[0] === "Admin") {
      return "/dashboard/analytics";
    } else if (user.roles[0] === "Civilian") {
      return "/dashboard/civilian";
    } else if (user.roles[0] === "Proprietor") {
      return "/dashboard/landlord";
    } else if (user.roles[0] === "Veteran" || "Active Duty") {
      return "/dashboard/military";
    }
  };

  const handleFormSubmit = (values) => {
    _console.log(values);
    userService
      .updateCurrentUser(values)
      .then(onUpdateFormSuccess)
      .catch(onUpdateError);

    const stateUserForTransport = { type: "USER_SETTINGS", payload: values };

    swal
      .fire("Hooray!", "Profile Updated!", "success", {
        button: "Ok",
      })
      .then(navigate(determineRoute(), { state: stateUserForTransport }));
  };

  const onUpdateFormSuccess = () => {
    toastr.success("Profile information successfully updated.");
  };

  const onUpdateError = () => {
    toastr.error("Profile information was not updated, please try again.");
  };

  _console.log(props.currentUser.roles[0]);

  return (
    <Container>
      <Row>
        <Col>
          <Header title="Profile" crumbs={crumbs} />
        </Col>
      </Row>
      <Row>
        <Col className="col-3">
          <ProfileCard
            currentUser={props.currentUser}
            profileData={profileData}
            path="/dashboard/military"
          />
        </Col>
        <Col className="col-9">
          <Tab.Container defaultActiveKey="settings">
            <Card className="card flex">
              <Card.Body className="card-body">
                <Nav
                  className="nav nav-pills bg-nav-pills nav-justified mb-3 flex"
                  role="tablist"
                >
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      to="#"
                      role="tab"
                      eventKey="profile"
                      className="nav-link rounded-0"
                    >
                      {props.currentUser.roles.includes("Civilian")
                        ? "Civilian Profile"
                        : null}
                      {props.currentUser.roles.includes("Active Duty")
                        ? "Military Profile"
                        : null}
                      {props.currentUser.roles.includes("Veteran")
                        ? "Military Profile"
                        : null}
                      {props.currentUser.roles.includes("Admin")
                        ? "Admin Profile"
                        : null}
                      {props.currentUser.roles.includes("Proprietor")
                        ? "Proprietor Profile"
                        : null}
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="nav-item">
                    <Nav.Link
                      to="#"
                      role="tab"
                      eventKey="settings"
                      className="nav-link rounded-0"
                    >
                      Settings
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    {props.currentUser.roles.includes("Civilian") ? (
                      <CivilianForm
                        profileData={profileData}
                        handleFormSubmit={handleFormSubmit}
                      />
                    ) : (
                      <MilitaryForm />
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="settings">
                    <div className="container-fluid">
                      <Formik
                        enableReinitialize={true}
                        initialValues={profileData}
                        onSubmit={handleFormSubmit}
                        validationSchema={userSettingsSchema}
                      >
                        <Form>
                          <h5 className="mb-4 text-uppercase">
                            <i className="mdi mdi-account-circle me-1"></i>
                            Edit Personal Info
                          </h5>
                          <div className="row flex">
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <Field
                                  name="firstName"
                                  type="text"
                                  placeholder="Enter first name"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="firstName"
                                  component="div"
                                  className="user-register-error-form"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">
                                  Middle Initial
                                </label>
                                <Field
                                  name="mi"
                                  type="text"
                                  placeholder="Enter middle initial"
                                  className="form-control"
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-3">
                                <label className="form-label">Last Name</label>
                                <Field
                                  name="lastName"
                                  type="text"
                                  placeholder="Enter last name"
                                  className="form-control"
                                />
                                <ErrorMessage
                                  name="lastName"
                                  component="div"
                                  className="user-register-error-form"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row flex">
                            <div className="col">
                              <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea
                                  name="userbio"
                                  type="text"
                                  placeholder="Place holder for other user information added in the future. Maybe housing priorites?"
                                  rows="4"
                                  className="form-control"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="row flex">
                            <div className="mb-3 col-md-6">
                              <div>
                                <label className="form-label">Password</label>
                                <div className="row flex">
                                  <span className="text-muted">
                                    <a
                                      role="button"
                                      onClick={handleForgotPassword}
                                    >
                                      Want to reset your password?
                                    </a>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-end">
                            <button
                              type="submit"
                              name="submit"
                              className="btn btn-success mt-2 mb-3"
                            >
                              <i className="mdi mdi-content-save"></i>
                              Save
                            </button>
                          </div>
                        </Form>
                      </Formik>
                    </div>
                    <UserSocialLinks />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

UserProfile.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    mi: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

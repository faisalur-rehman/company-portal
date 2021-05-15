import PropTypes from "prop-types"
import React, { useState } from "react"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"

// availity-reactstrap-validation
import { Formik, Form, Field, ErrorMessage } from "formik"

// action
import { registerUser, apiError, registerUserFailed } from "../../store/actions"

// Redux
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"

// import images
import profileImg from "../../assets/images/profile-img.png"
// import logoImg from "../../assets/images/logo.svg"
import logo from "../../assets/images/logo-dark.png"

//ApiCalls
import { postData } from "../Api/ApiRequest"

const Register = () => {
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const validate = values => {
    const errors = {}

    if (!values.password) {
      errors.password = "Required"
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 characters long."
    }
    if (!values.email) {
      errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }
    if (!values.name) {
      errors.name = "Required"
    } else if (values.name.length < 5) {
      errors.name = "name must be 5 characters long."
    }

    return errors
  }

  const handleSubmit = async data => {
    try {
      const resData = await postData("/auth/tour-guide-register", data)
      setError(null)
      setTimeout(() => setRedirect(true), 3000)
      console.log(resData)
    } catch (err) {
      // setError(err.response.data.name)
      console.log(err.response)
    }
    setClicked(true)
  }

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-8">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">
                          Welcome to Company Portal
                        </h5>
                        <p>We are excited to have you on board.</p>
                      </div>
                    </Col>
                    <Col className="col-4 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2 mt-3">
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                        name: "",
                      }}
                      onSubmit={handleSubmit}
                      validate={validate}
                    >
                      {() => (
                        <>
                          <div
                            className="error"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {error && <p>{error}</p>}
                          </div>
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Field
                                name="email"
                                className="form-control"
                                placeholder="Enter email"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                name="name"
                                placeholder="Enter name"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>

                            <div className="mb-3">
                              <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Enter Password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>

                            <div className="mt-4">
                              <Button
                                className="w-100"
                                type="submit"
                                color="primary"
                              >
                                Register
                              </Button>
                              {clicked && !error && (
                                <>
                                  <p>Registered Successfully</p>
                                  {redirect && <Redirect to="/login" />}
                                </>
                              )}
                            </div>

                            <div className="mt-4 text-center">
                              <p className="mb-0">
                                By registering you agree to the Company Portal
                                <a
                                  href="https://www.sicurogroup.com.au/"
                                  className="text-primary"
                                  target="_blank"
                                >
                                  Terms of Use
                                </a>
                              </p>
                            </div>
                          </Form>
                        </>
                      )}
                    </Formik>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account?
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func,
  registerUserFailed: PropTypes.func,
  registrationError: PropTypes.any,
  user: PropTypes.any,
}

const mapStatetoProps = state => {
  const { user, registrationError, loading } = state.Account
  return { user, registrationError, loading }
}

export default connect(mapStatetoProps, {
  registerUser,
  apiError,
  registerUserFailed,
})(Register)

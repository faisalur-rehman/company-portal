import React, { useState } from "react"
import { Row, Col, CardBody, Card, Container } from "reactstrap"
import { Form, ErrorMessage, Field, Formik } from "formik"
import "./Style.css"
import { Link, Redirect } from "react-router-dom"

import { postData } from "../Api/ApiRequest"
// import images
import profile from "../../assets/images/profile-img.png"
import Loader from "pages/Loader/Loader"
import historyPush from "pages/HistoryPush/HistoryPush"

const Login = () => {
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [loginType, setType] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [loading, setLoading] = useState(true)
  // if (localStorage.getItem("token")) {
  //   localStorage.removeItem("token")
  // }
  // if (localStorage.getItem("type")) {
  //   localStorage.removeItem("type")
  // }
  // if (localStorage.getItem("id")) {
  //   localStorage.removeItem("id")
  // }

  const handleSubmit = async data => {
    setClicked(true)
    let resData
    if (!resData) {
      setLoading(true)
    }
    console.log("resData", resData)
    try {
      resData = await postData("/auth/login", data)
      setError(null)
      console.log("resData", resData)
      setLoading(false)
      // localStorage.setItem("id", resData.data.user._id)
      setType(resData.data.user.type)
      localStorage.setItem("token", resData.data.user.token)
      localStorage.setItem("type", resData.data.user.type)
      // localStorage.setItem("id", resData.data.user._id)
      setRedirect(true)
    } catch (err) {
      setError(err.response.data.name)
      console.log(err.response)
      setLoading(false)
    }
  }
  function validate(values) {
    const errors = {}
    if (!values.email) {
      errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address"
    }
    if (!values.password) {
      errors.password = "Required"
    }
    return errors
  }
  return (
    <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <>
            <div className="home-btn d-none d-sm-block">
              <Link to="/" className="text-dark">
                <i className="fas fa-home h2" />
              </Link>
            </div>
            <div className="account-pages my-5 pt-sm-5">
              <Container>
                <Row className="justify-content-center">
                  <Col md={8} lg={7} xl={5}>
                    <Card className="overflow-hidden">
                      <div className="card-bg">
                        <Row>
                          <Col xs={8}>
                            <div className="p-4">
                              <h5 className="text">Welcome Back !</h5>
                              <p>Sign in to continue to Company Portal.</p>
                            </div>
                          </Col>
                          <Col className="col-4 align-self-end">
                            <img src={profile} alt="" className="img-fluid" />
                          </Col>
                        </Row>
                      </div>
                      <CardBody className="pt-0">
                        <div className="p-2">
                          <br />
                          <Form className="form-horizontal">
                            <div className="mb-3">
                              <Field
                                name="email"
                                type="email"
                                className="form-control select"
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
                                name="password"
                                type="password"
                                className="form-control select"
                                placeholder="Enter Password"
                              />
                              <ErrorMessage
                                name="password"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>

                            <div className="mt-3 d-grid button-color">
                              <button
                                className="btn btn-block waves-effect waves-light"
                                type="submit"
                                style={{ color: "white" }}
                              >
                                {clicked && loading ? <Loader /> : "Log In"}
                              </button>
                            </div>
                            <p style={{ color: "red" }}>{error}</p>
                            {redirect &&
                              loginType === "company" &&
                              // <Redirect to="/profile" />
                              historyPush("/profile")}
                            {redirect &&
                              loginType === "admin" &&
                              historyPush("/welcomeAdmin")}
                            <div className="mt-4 text-center">
                              <Link to="/resetPassword" className="text-muted">
                                <i className="mdi mdi-lock me-1" />
                                Forgot your password?
                              </Link>
                            </div>
                          </Form>
                        </div>
                      </CardBody>
                    </Card>
                    <div className="mt-5 text-center">
                      <p>
                        Don&#39;t have an account ?
                        <Link to="register" className="fw-medium text-primary">
                          Signup now
                        </Link>
                      </p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </>
        )}
      </Formik>
    </div>
  )
}
export default Login

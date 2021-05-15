import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
// import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Link, Redirect } from "react-router-dom"

import profile from "../../assets/images/profile-img.png"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"

import Step1 from "pages/Trackbar/Step1"

const initialValues = { places: "", route: "" }

const ToursMilan = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/tour-guide/${localStorage.getItem("id")}`,
          localStorage.getItem("token")
        )
        if (data.tourGuide) {
          initialValues.places = data.tourGuide.places
          initialValues.route = data.tourGuide.route
          setValues(initialValues)
        }
        console.log(data)
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err.response)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    if (!values.route) {
      errors.route = "Required"
    }
    if (!values.places) {
      errors.places = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    try {
      const resData = await formPostData(
        "/tour-guide/guide",
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData)
    } catch (err) {
      console.log(err.response)
    }
    setClicked(true)
    setRedirect(true)
  }
  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Step1 active={2} />
        <Col>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages my-5 pt-sm-5">
                  <Container>
                    <Row className="justify-content-center">
                      <Col>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">Tour Milan!</h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end">
                                {/* <img
                                  src={profile}
                                  alt=""
                                  className="img-fluid"
                                /> */}
                              </Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <label htmlFor="route">
                                Explain Your Route:{" "}
                              </label>
                              <Field
                                as="textarea"
                                name="route"
                                id="route"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="route"
                                component="div"
                                style={{ color: "red" }}
                              />

                              <br />
                              <label>Add places you know: </label>
                              <Field
                                as="textarea"
                                name="places"
                                id="places"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="places"
                                component="div"
                                style={{ color: "red" }}
                              />

                              {/* <FieldArray name="places">
                                {({ push }) => (
                                  <div>
                                    {values.places.map((product, index) => (
                                      <div key={index}>
                                        <Field
                                          name={`places${index}`}
                                          className="form-control"
                                        />
                                        <br />
                                        <ErrorMessage
                                          name={`product${index}`}
                                          component="div"
                                          style={{ color: "red" }}
                                        />
                                      </div>
                                    ))}
                                    {error && (
                                      <p style={{ color: "red" }}>{error}</p>
                                    )}
                                    <Button
                                      color="secondary"
                                      onClick={() => push("")}
                                    >
                                      Add More Products
                                    </Button>
                                    <Button
                                      color="primary"
                                      className="m-2"
                                      type="submit"
                                    >
                                      Submit
                                    </Button>
                                    {redirect && <Redirect to="meetPoint" />}

                                     {!error && clicked && (
                                      <Redirect to="uniqueSelling" />
                                    )}
                                    {redirect && <Redirect to="login" />} 
                                  </div>
                                )}
                              </FieldArray> */}
                              <Button
                                type="submit"
                                className="mt-4"
                                color="primary"
                              >
                                Submit
                              </Button>
                              {redirect && <Redirect to="meetPoint" />}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default ToursMilan

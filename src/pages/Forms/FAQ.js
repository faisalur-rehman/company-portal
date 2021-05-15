import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
// import { formGetData, formPostData, patchData } from "./ApiRequest"
import { Link, Redirect } from "react-router-dom"

import profile from "../../assets/images/profile-img.png"
// import { formGetData, formPostData, patchData } from "./ApiRequest"

import Step1 from "pages/Trackbar/Step1"

const initialValues = { faqs: [""] }

const FAQ = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {}, [])
  function validate(values) {
    const errors = {}
    // if (!values.hours) {
    //   errors.hours = "Required"
    // }
    // if (!values.price) {
    //   errors.price = "Required"
    // }
    // if (!values.duration) {
    //   errors.duration = "Required"
    // }

    return errors
  }
  function handleSubmit(data) {
    console.log(data)
    let faq = []
    data.faqs.map((q, index) =>
      faq.push({
        question: data[`question${index}`],
        answer: data[`answer${index}`],
      })
    )
    console.log(faq)
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
        <Step1 active={4} />
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
                                  <h5 className="text-primary">FAQ's!</h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end"></Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <label>Add Frequently Asked Questions: </label>

                              <FieldArray name="faqs">
                                {({ push }) => (
                                  <div>
                                    {values.faqs.map((product, index) => (
                                      <div key={index}>
                                        <label>Question:</label>
                                        <Field
                                          name={`question${index}`}
                                          className="form-control"
                                        />
                                        <br />
                                        <ErrorMessage
                                          name={`question${index}`}
                                          component="div"
                                          style={{ color: "red" }}
                                        />
                                        <label>Answer:</label>
                                        <br />
                                        <Field
                                          name={`answer${index}`}
                                          className="form-control"
                                        />
                                        <br />
                                        <ErrorMessage
                                          name={`answer${index}`}
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
                                      Add More FAQ's
                                    </Button>
                                    <Button
                                      color="primary"
                                      className="m-2"
                                      type="submit"
                                    >
                                      Submit
                                    </Button>
                                    {/* {!error && clicked && (
                                      <Redirect to="uniqueSelling" />
                                    )}
                                    {redirect && <Redirect to="login" />} */}
                                  </div>
                                )}
                              </FieldArray>
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

export default FAQ

import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"
import historyPush from "pages/HistoryPush/HistoryPush"

const initialValues = {
  companySize: "select",
  phoneNumber: "",
  hearAboutUs: "select",
}

const CompanyInfo = props => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [previous, setPrevious] = useState(false)
  console.log(props.location.state)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await formGetData(
          `/company-post/second-form/${props.location.state.id}`,
          localStorage.getItem("token")
        )
        console.log("2nd form response", response.data)
        if (response.data.profile) {
          initialValues.companySize = response.data.profile.companySize
          initialValues.hearAboutUs = response.data.profile.hearAboutUs
          initialValues.phoneNumber = response.data.profile.phoneNumber

          setValues(initialValues)
        }

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
    if (values.companySize === "select") {
      errors.companySize = "Required"
    }
    if (values.hearAboutUs === "select") {
      errors.hearAboutUs = "Required"
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    try {
      const resData = await patchData(
        `/company-post/second-form/${props.location.state.id}`,
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData)
    } catch (err) {
      // setError(err.response.data.name)
      console.log(err.response)
    }
    setClicked(true)
    setRedirect(true)
  }
  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col sm={8}>
            {/* <Col  md={8} lg={6} xl={5}> */}
            <Card className="overflow-hidden">
              <div className="card-bg">
                <Row>
                  <Col xs={7}>
                    <div className=" p-4">
                      <h5 className="text">Company Info!</h5>
                    </div>
                  </Col>
                  <Col className="col-5 align-self-end"></Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <div className="p-2">
                  <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                  >
                    {({ values }) => (
                      <Form>
                        <br />
                        <label className="mt-3">Company Size</label>
                        <Field
                          as="select"
                          name="companySize"
                          className="w-100 select"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="_1_49">1-49</option>
                          <option value="_50_149">50-149</option>
                          <option value="_250_499">250-499</option>
                          <option value="_500_749">500-749</option>
                          <option value="_750_999">750-999</option>
                          <option value="_1000_plus">1000+</option>
                        </Field>
                        <ErrorMessage
                          name="companySize"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">
                          Where did you here about us?
                        </label>
                        <Field
                          as="select"
                          name="hearAboutUs"
                          className="w-100 select"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="mouth_word">Website</option>
                          <option value="tv">TV</option>
                          <option value="onlineVideo">Internet Search</option>
                          <option value="newspaper">Newspaper</option>
                          <option value="mail">Mail</option>
                          <option value="radio">Radio</option>
                          <option value="streamAudio">Friend or Family</option>
                        </Field>
                        <ErrorMessage
                          name="hearAboutUs"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">Phone Number:</label>
                        <Field
                          name="phoneNumber"
                          type="number"
                          className="form-control select"
                          placeholder="Enter Phone number"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <button
                              type="submit"
                              className="mt-4 button-color btn btn-block waves-effect waves-light"
                            >
                              Submit
                            </button>
                          </div>
                          <div>
                            <button
                              className="mt-4 button-color btn btn-block waves-effect waves-light"
                              onClick={() => setPrevious(true)}
                            >
                              <Link
                                to="/employerData"
                                style={{ color: "white" }}
                              >
                                Previous
                              </Link>
                            </button>
                          </div>
                        </div>
                        <br />
                        {/* {clicked && !error && (
                          <Button
                            color="primary"
                            onClick={() => setRedirect(true)}
                          >
                            See job posting here
                          </Button>
                        )} */}
                        {/* {previous && <a href='/employerData'></a>} */}
                        {redirect &&
                          historyPush("/jobDetails", props.location.state.id)}
                      </Form>
                    )}
                  </Formik>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default CompanyInfo

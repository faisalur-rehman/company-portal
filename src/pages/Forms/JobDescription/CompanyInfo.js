import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

const initialValues = {
  size: "select",
  phoneNo: "",
  hereAboutUs: "select",
}

const CompanyInfo = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState("")
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  //   useEffect(() => {
  //     // async function fetchData() {
  //     //   try {
  //     //     const { data } = await formGetData(
  //     //       `/tour-guide/${localStorage.getItem("id")}`,
  //     //       localStorage.getItem("token")
  //     //     )
  //     //     if (data.tourGuide) {
  //     //       initialValues.jobDescription = data.tourGuide.jobDescription
  //     //       initialValues.jobTitle = data.tourGuide.jobTitle
  //     //       setValues(initialValues)
  //     //     }
  //     //     console.log(data)
  //     //     setError(null)
  //     //   } catch (err) {
  //     //     // setError(err.response)
  //     //     console.log(err.response)
  //     //   }
  //     // }
  //     // fetchData()
  //   }, [])
  function validate(values) {
    const errors = {}
    if (values.size === "select") {
      errors.size = "Required"
    }
    if (values.hereAboutUs === "select") {
      errors.hereAboutUs = "Required"
    }
    if (!values.phoneNo) {
      errors.phoneNo = "Required"
    }
    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    setClicked(true)
    // try {
    //   const resData = await formPostData(
    //     "/tour-guide/info",
    //     data,
    //     localStorage.getItem("token")
    //   )
    //   setError(null)
    //   console.log(resData.data.tourGuide._id)
    //   setId(resData.data.tourGuide._id)
    //   localStorage.setItem("id", resData.data.tourGuide._id)
    // } catch (err) {
    //   // setError(err.response.data.name)
    //   console.log(err.response)
    // }
    // setClicked(true)
    // setRedirect(true)
    // setId("Job Description Posted Successfully.")
  }
  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col>
            {/* <Col  md={8} lg={6} xl={5}> */}
            <Card className="overflow-hidden">
              <div className="bg-primary bg-soft">
                <Row>
                  <Col xs={7}>
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Job Details!</h5>
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
                        <Field as="select" name="size" className="w-100">
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="hiringmanager">1-50</option>
                          <option value="ceo">50-100</option>
                          <option value="teamlead">100-200</option>
                          <option value="recruiter">200-500</option>
                          <option value="recruiter">500+</option>
                        </Field>
                        <ErrorMessage
                          name="size"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">
                          Where did you here about us?
                        </label>
                        <Field as="select" name="hereAboutUs" className="w-100">
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="sociamedia">Social Media</option>
                          <option value="tv">TV</option>
                          <option value="online">Online</option>
                          <option value="podcast">Podcast</option>
                          <option value="newspaper">Newspaper</option>
                          <option value="searchengine">Search Engine</option>
                        </Field>
                        <ErrorMessage
                          name="type"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">Phone Number:</label>
                        <Field
                          name="phoneNo"
                          type="number"
                          className="form-control"
                          placeholder="Enter Phone number"
                        />
                        <ErrorMessage
                          name="phoneNo"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <div>
                          <Button
                            type="submit"
                            className="mt-4"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </div>
                        <br />
                        {clicked && !error && (
                          <Button
                            color="primary"
                            onClick={() => setRedirect(true)}
                          >
                            See job posting here
                          </Button>
                        )}
                        {/* {redirect && <Redirect to="companyJob" />} */}
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

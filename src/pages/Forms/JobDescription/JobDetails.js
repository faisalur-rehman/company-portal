import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

// import profile from "../../../assets/images/profile-img.png"
// import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  // jobDescription: "",
  // jobTitle: "",
  // hoursToWork: "",
  // pricePerHour: "",
  employmentType: "select",
  contractType: "",
  date: "",
  salary: "",
  deadline: "",
  plannedDate: "",
  deadlineDate: "",
  reveivingMethod: "select",
}

const JobDetails = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState("")
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const { data } = await formGetData(
    //       `/tour-guide/${localStorage.getItem("id")}`,
    //       localStorage.getItem("token")
    //     )
    //     if (data.tourGuide) {
    //       initialValues.jobDescription = data.tourGuide.jobDescription
    //       initialValues.jobTitle = data.tourGuide.jobTitle
    //       setValues(initialValues)
    //     }
    //     console.log(data)
    //     setError(null)
    //   } catch (err) {
    //     // setError(err.response)
    //     console.log(err.response)
    //   }
    // }
    // fetchData()
  }, [])
  function validate(values) {
    const errors = {}
    // if (!values.salary) {
    //   errors.salary = "Required"
    // }
    // if (!values.date) {
    //   errors.date = "Required"
    // }
    // if (!values.contractType) {
    //   errors.contractType = "Required"
    // }
    // if (!values.employmentType) {
    //   errors.employmentType = "Required"
    // }
    // if (!values.deadline) {
    //   errors.deadline = "Required"
    // }

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
                        <label className="mt-3" htmlFor="jobDescription">
                          What type of Employment is it?
                        </label>
                        <br />
                        <Field
                          as="select"
                          name="employmentType"
                          className="w-100"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="fulltime">Full Time</option>
                          <option value="parttime">Part Time</option>
                          <option value="contractual">Contractual</option>
                        </Field>
                        <ErrorMessage
                          name="type"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <div role="group" aria-labelledby="checkbox-group">
                          <label className="mt-3">
                            What contract type is it?
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="contractType"
                              value="contract"
                              className="m-2"
                            />
                            Contract
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="contractType"
                              value="internship"
                              className="m-2"
                            />
                            Internship
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="contractType"
                              value="commission"
                              className="m-2"
                            />
                            Commission
                          </label>
                          <br />
                        </div>
                        <label className="mt-3">
                          Is there a planned date when to start?
                        </label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="date"
                              value="yes"
                              className="m-2"
                            />
                            Yes
                          </label>
                        </div>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="date"
                              value="no"
                              className="m-2"
                            />
                            No
                          </label>
                        </div>
                        {values.date === "yes" && (
                          <Field
                            type="date"
                            name="plannedDate"
                            className="w-100"
                          />
                        )}
                        <label className="mt-3">Monthly Salary:</label>
                        <Field
                          name="salary"
                          type="number"
                          className="form-control"
                          placeholder="Enter Salary"
                        />
                        <ErrorMessage
                          name="salary"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">
                          Is there an application deadline?
                        </label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="deadline"
                              value="yes"
                              className="m-2"
                            />
                            Yes
                          </label>
                        </div>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="deadline"
                              value="no"
                              className="m-2"
                            />
                            No
                          </label>
                        </div>
                        <div>
                          {values.deadline === "yes" && (
                            <Field
                              type="date"
                              name="deadlineDate"
                              className="w-100"
                            />
                          )}
                        </div>
                        <br />
                        <label className="mt-3">
                          Do you want applicants to submit resume?
                        </label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="resume"
                              value="yes"
                              className="m-2"
                            />
                            Yes
                          </label>
                        </div>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="resume"
                              value="no"
                              className="m-2"
                            />
                            No
                          </label>
                        </div>
                        <label>
                          <Field
                            type="radio"
                            name="resume"
                            value="optional"
                            className="m-2"
                          />
                          Optional
                        </label>
                        <br />
                        <label className="mt-3" htmlFor="jobDescription">
                          How do you want to reveive applications?
                        </label>
                        <br />
                        <Field
                          as="select"
                          name="receivingMethod"
                          className="w-100"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="email">Email</option>
                          <option value="inperson">In-Person</option>
                        </Field>
                        <ErrorMessage
                          name="type"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <label className="mt-3" htmlFor="jobDescription">
                          Job Description:
                        </label>
                        <Field
                          as="textarea"
                          rows={6}
                          name="jobDescription"
                          id="jobDescription"
                          className="form-control"
                          placeholder="Enter job description"
                        />
                        <ErrorMessage
                          name="jobDescription"
                          component="div"
                          style={{ color: "red" }}
                        />

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

export default JobDetails

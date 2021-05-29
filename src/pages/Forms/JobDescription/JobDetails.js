import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"
import historyPush from "pages/HistoryPush/HistoryPush"

// import profile from "../../../assets/images/profile-img.png"
// import Step1 from "pages/Trackbar/Step1"

let initialValues = {
  empType: "select",
  contractType: "",
  contractDuration: "",
  isPlannedStartDate: "",
  plannedDate: "",
  salaryCompensation: "select",
  salaryRangeFrom: 0,
  salaryRangeTo: 0,
  compensationType: "select",
  receiveApplication: "email",
  streetAddress: "",
  canSubmitResume: "",
  isApplicationDeadline: "",
  deadlineDate: "",
  jobDescription: "",
  experience: "",
  candidateBackground: "select",
  // startingAt: 0,
  // exact: 0,
  // upto: 0,
}

const JobDetails = props => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState("")
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [previous, setPrevious] = useState(false)
  // console.log("id", props.location.state.id)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company-post/third-form/${localStorage.getItem("id")}`,
          localStorage.getItem("token")
        )
        console.log("dat", data)
        if (data.post) {
          initialValues.jobDescription = data.post.jobDescription
          initialValues.canSubmitResume = data.post.canSubmitResume
          initialValues.compensationType = data.post.compensationType
          initialValues.contractDuration = data.post.contractDuration
          if (data.post.contractDuration) {
            initialValues.contractDuration = data.post.contractDuration
          }
          initialValues.contractType = data.post.contractType
          if (data.post.deadlineDate) {
            initialValues.deadlineDate = data.post.deadlineDate
          }
          initialValues.empType = data.post.empType
          if (data.post.plannedDate) {
            initialValues.plannedDate = data.post.plannedDate
          }
          initialValues.salaryCompensation = data.post.salaryCompensation
          if (data.post.salaryRangeTo) {
            initialValues.salaryRangeTo = data.post.salaryRangeTo
          }
          initialValues.salaryRangeFrom = data.post.salaryRangeFrom
          if (data.post.isApplicationDeadline) {
            initialValues.isApplicationDeadline = "yes"
          } else {
            initialValues.isApplicationDeadline = "no"
          }
          if (data.post.isPlannedStartDate) {
            initialValues.isPlannedStartDate = "yes"
          } else {
            initialValues.isPlannedStartDate = "no"
          }
          setValues(initialValues)
        }
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err)
      }
    }
    fetchData()
  }, [])
  // console.log("initial", initialValues)

  function validate(values) {
    const errors = {}

    // isApplicationDeadline: "",
    // deadlineDate: "",
    // jobDescription: "",
    if (values.empType === "select") {
      errors.empType = "Required"
    }
    if (values.compensationType === "select") {
      errors.compensationType = "Required"
    }

    if (values.salaryCompensation === "select") {
      errors.salaryCompensation = "Required"
    }
    if (
      values.contractType === "internship" ||
      values.contractType === "contract"
    ) {
      if (+values.contractDuration < 1) {
        errors.contractDuration = "Duration should be atleast one month long."
      }
    }
    if (!values.isPlannedStartDate) {
      errors.isPlannedStartDate = "Required"
    }
    // if (values.receiveApplication === "inPerson" && !values.streetAddress) {
    //   errors.streetAddress = "Required"
    // }
    if (!values.isApplicationDeadline) {
      errors.isApplicationDeadline = "Required"
    }
    if (!values.canSubmitResume) {
      errors.canSubmitResume = "Required"
    }
    if (values.isApplicationDeadline === "yes" && !values.deadlineDate) {
      errors.deadlineDate = "Required"
    }
    if (values.isPlannedStartDate === "yes" && !values.plannedDate) {
      errors.plannedDate = "Required"
    }
    if (!values.contractType) {
      errors.contractType = "Required"
    }
    if (!values.empType) {
      errors.empType = "Required"
    }
    if (!values.isApplicationDeadline) {
      errors.isApplicationDeadline = "Required"
    }
    let words = values.jobDescription.split(" ")
    if (words.length < 95) {
      errors.jobDescription = "At least 95 words are required"
    }

    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    if (data.isPlannedStartDate === "yes") {
      data.isPlannedStartDate = true
    } else {
      data.isPlannedStartDate = false
    }
    if (data.isApplicationDeadline === "yes") {
      data.isApplicationDeadline = true
    } else {
      data.isApplicationDeadline = false
    }
    if (
      data.contractType !== "internship" &&
      data.contractType !== "contract"
    ) {
      data.contractDuration = 0
    }
    if (data.isPlannedStartDate === "no") {
      data.plannedDate = ""
    }
    if (data.isApplicationDeadline === "no") {
      data.deadlineDate = ""
    }
    // if (data.receiveApplication === "mail") {
    //   data.streetAddress = ""
    // }
    try {
      const resData = await patchData(
        `/company-post/third-form/${localStorage.getItem("id")}`,
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response)
      console.log(err.response)
    }
    setClicked(true)
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
                    <div className="p-4">
                      <h5 className="text">Job Details!</h5>
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
                        <label className="mt-3">
                          What type of Employment is it?
                        </label>
                        <br />
                        <Field
                          as="select"
                          name="empType"
                          className="w-100 active select"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="fullTime">Full Time</option>
                          <option value="partTime">Part Time</option>
                          <option value="either">Either</option>
                        </Field>
                        <ErrorMessage
                          name="empType"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label>What should be Candidate Background?</label>
                        <Field
                          as="select"
                          name="candidateBackground"
                          className="w-100 active select"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="secondary">Secondary</option>
                          <option value="college">College</option>
                          <option value="university">University</option>
                          <option value="no_need">Not needed</option>
                        </Field>
                        <ErrorMessage
                          name="candidateBackground"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">
                          Work Experience Required:
                        </label>
                        <Field
                          name="experience"
                          className="form-control textarea"
                          placeholder="Enter work experience"
                        />
                        <ErrorMessage
                          name="experience"
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
                              value="newGrad"
                              className="m-2"
                            />
                            New-Grad
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="contractType"
                              value="temporary"
                              className="m-2"
                            />
                            Temporary
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
                          <ErrorMessage
                            name="contractType"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                        {(values.contractType === "internship" ||
                          values.contractType === "contract") && (
                          <>
                            <label className="mt-3">
                              How long is the contract? (in months)
                            </label>
                            <Field
                              name="contractDuration"
                              type="number"
                              className="form-control select"
                              placeholder="Enter contract duration"
                            />
                            <ErrorMessage
                              name="contractDuration"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </>
                        )}
                        <label className="mt-3">
                          Is there a planned date when to start?
                        </label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="isPlannedStartDate"
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
                              name="isPlannedStartDate"
                              value="no"
                              className="m-2"
                            />
                            No
                          </label>
                        </div>
                        <ErrorMessage
                          name="isPlannedStartDate"
                          component="div"
                          style={{ color: "red" }}
                        />
                        {values.isPlannedStartDate === "yes" && (
                          <>
                            <Field
                              type="date"
                              name="plannedDate"
                              className="w-100 date select"
                            />
                            <ErrorMessage
                              name="plannedDate"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </>
                        )}
                        <label className="mt-3">Salary:</label>

                        <Field
                          as="select"
                          name="salaryCompensation"
                          className="w-100 select"
                        >
                          <option defaultValue value="select" disabled>
                            Select
                          </option>
                          <option value="startingAt">Starting At</option>
                          <option value="range">Range</option>
                          <option value="upto">Up to</option>
                          <option value="exact">Exact Rate</option>
                        </Field>
                        <br />
                        {(values.salaryCompensation === "startingAt" && (
                          <>
                            <br />
                            <Field
                              name="salaryRangeFrom"
                              className="w-40 date select"
                              placeholder="Starting at.."
                            />
                            <Field
                              as="select"
                              name="compensationType"
                              className="w-40 select"
                              style={{ marginLeft: 30 }}
                            >
                              <option defaultValue value="select" disabled>
                                Select
                              </option>
                              <option value="hour">per hour</option>
                              <option value="day">per day</option>
                              <option value="week">per week</option>
                              <option value="month">per month</option>
                              <option value="year">per year</option>
                            </Field>
                            <ErrorMessage
                              name="compensationType"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </>
                        )) ||
                          (values.salaryCompensation === "range" && (
                            <>
                              {" "}
                              <br />
                              <Field
                                name="salaryRangeFrom"
                                className="w-40 date select"
                                placeholder="From"
                              />{" "}
                              to{" "}
                              <Field
                                name="salaryRangeTo"
                                className="w-40 date select"
                                placeholder="To"
                              />
                              <Field
                                as="select"
                                name="compensationType"
                                className="w-40 select"
                                style={{ marginLeft: 30 }}
                              >
                                <option defaultValue value="select" disabled>
                                  Select
                                </option>
                                <option value="hour">per hour</option>
                                <option value="day">per day</option>
                                <option value="week">per week</option>
                                <option value="month">per month</option>
                                <option value="year">per year</option>
                              </Field>
                              <ErrorMessage
                                name="compensationType"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </>
                          )) ||
                          (values.salaryCompensation === "upto" && (
                            <>
                              <br />
                              <Field
                                name="salaryRangeFrom"
                                className="w-40 date select"
                                placeholder="Upto.."
                              />
                              <Field
                                as="select"
                                name="compensationType"
                                className="w-40 select"
                                style={{ marginLeft: 30 }}
                              >
                                <option defaultValue value="select" disabled>
                                  Select
                                </option>
                                <option value="hour">per hour</option>
                                <option value="day">per day</option>
                                <option value="week">per week</option>
                                <option value="month">per month</option>
                                <option value="year">per year</option>
                              </Field>
                              <ErrorMessage
                                name="compensationType"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </>
                          )) ||
                          (values.salaryCompensation === "exact" && (
                            <>
                              <br />
                              <Field
                                name="salaryRangeFrom"
                                className="w-40 date select"
                                placeholder="Exact Rate.."
                              />
                              <Field
                                as="select"
                                name="compensationType"
                                className="w-40 select"
                                style={{ marginLeft: 30 }}
                              >
                                <option defaultValue value="select" disabled>
                                  Select
                                </option>
                                <option value="hour">per hour</option>
                                <option value="day">per day</option>
                                <option value="week">per week</option>
                                <option value="month">per month</option>
                                <option value="year">per year</option>
                              </Field>
                              <ErrorMessage
                                name="compensationType"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </>
                          ))}
                        <ErrorMessage
                          name="salaryCompensation"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">
                          Is there an application Deadline?
                        </label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="isApplicationDeadline"
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
                              name="isApplicationDeadline"
                              value="no"
                              className="m-2"
                            />
                            No
                          </label>
                        </div>
                        <div>
                          {values.isApplicationDeadline === "yes" && (
                            <>
                              <Field
                                type="date"
                                name="deadlineDate"
                                className="w-100 date select"
                              />
                              <ErrorMessage
                                name="deadlineDate"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </>
                          )}
                        </div>
                        <ErrorMessage
                          name="isApplicationDeadline"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3">
                          Do you want applicants to submit resume?
                        </label>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="canSubmitResume"
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
                              name="canSubmitResume"
                              value="no"
                              className="m-2"
                            />
                            No
                          </label>
                        </div>
                        <div>
                          <label>
                            <Field
                              type="radio"
                              name="canSubmitResume"
                              value="optional"
                              className="m-2"
                            />
                            Optional
                          </label>
                        </div>

                        <ErrorMessage
                          name="canSubmitResume"
                          component="div"
                          style={{ color: "red" }}
                        />
                        <br />
                        <label className="mt-3" htmlFor="jobDescription">
                          Job Description:
                        </label>
                        <Field
                          as="textarea"
                          rows={6}
                          name="jobDescription"
                          id="jobDescription"
                          className="form-control textarea"
                          placeholder="Enter job description"
                        />
                        <ErrorMessage
                          name="jobDescription"
                          component="div"
                          style={{ color: "red" }}
                        />

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
                              Previous
                            </button>
                          </div>
                        </div>
                        <br />
                        {clicked && !error && (
                          <button
                            onClick={() => setRedirect(true)}
                            className="button-color btn btn-block waves-effect waves-light"
                          >
                            See job posting here
                          </button>
                        )}
                        {previous && historyPush("/companyInfo")}
                        {redirect && historyPush("/companyJob")}
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

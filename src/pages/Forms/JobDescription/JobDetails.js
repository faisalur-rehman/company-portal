import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

// import profile from "../../../assets/images/profile-img.png"
// import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  jobDescription: "",
  jobTitle: "",
  hoursToWork: "",
  pricePerHour: "",
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
    if (!values.jobDescription) {
      errors.jobDescription = "Required"
    }
    if (!values.jobTitle) {
      errors.jobTitle = "Required"
    }
    if (!values.pricePerHour) {
      errors.pricePerHour = "Required"
    }
    if (!values.hoursToWork) {
      errors.hoursToWork = "Required"
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
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* <Step1 active={0} style={{ width: "60%" }} /> */}
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="Job Details"
          >
            <label className="mt-3" htmlFor="jobDescription">
              What type of Employment is it?
            </label>
            <br />
            <Field as="select" name="type" className="w-100">
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
              <label className="mt-3">What contract type is it?</label>
              <br />
              <label>
                <Field
                  type="checkbox"
                  name="checked"
                  value="One"
                  className="m-2"
                />
                One
              </label>
              <br />
              <label>
                <Field
                  type="checkbox"
                  name="checked"
                  value="Two"
                  className="m-2"
                />
                Two
              </label>
              <br />
              <label>
                <Field
                  type="checkbox"
                  name="checked"
                  value="Three"
                  className="m-2"
                />
                Three
              </label>
              <br />
            </div>
            <label className="mt-3">
              Is there a planned date when to start?
            </label>
            <div>
              <label>
                <Field type="radio" name="date" value="yes" className="m-2" />
                Yes
              </label>
            </div>
            <div>
              <label>
                <Field type="radio" name="date" value="no" className="m-2" />
                No
              </label>
            </div>
            {/* <br /> */}

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
            <label className="mt-3">Is there an application deadline?</label>
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
            <br />
            <label className="mt-3">
              Do you want applicants to submit resume?
            </label>
            <div>
              <label>
                <Field type="radio" name="resume" value="yes" className="m-2" />
                Yes
              </label>
            </div>
            <div>
              <label>
                <Field type="radio" name="resume" value="no" className="m-2" />
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
              <Button type="submit" className="mt-4" color="primary">
                Submit
              </Button>
            </div>
            <br />
            {clicked && !error && (
              <Button color="primary" onClick={() => setRedirect(true)}>
                See job posting here
              </Button>
            )}
            {redirect && <Redirect to="companyJob" />}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default JobDetails

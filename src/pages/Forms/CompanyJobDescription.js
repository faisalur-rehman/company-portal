import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  jobDescription: "",
  jobTitle: "",
  hoursToWork: "",
  pricePerHour: "",
}

const CompanyJobDescription = () => {
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
            title="Job Description"
          >
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
            <br />
            <label className="mt-3" htmlFor="jobTitle">
              Job Title:
            </label>
            <Field
              name="jobTitle"
              id="jobTitle"
              className="form-control"
              placeholder="Enter job title"
            />
            <ErrorMessage
              name="jobTitle"
              component="div"
              style={{ color: "red" }}
            />
            <br />

            <label className="mt-3" htmlFor="hoursToWork">
              Hours To Work:
            </label>
            <Field
              name="hoursToWork"
              id="hoursToWork"
              className="form-control"
              placeholder="Enter Total Hours to work/ Company Timings"
            />
            <ErrorMessage
              name="hoursToWork"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="pricePerHour">
              Price Per Hour:
            </label>
            <Field
              name="pricePerHour"
              id="pricePerHour"
              className="form-control"
              placeholder="Enter Salary Per Hour"
            />
            <ErrorMessage
              name="pricePerHour"
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

export default CompanyJobDescription

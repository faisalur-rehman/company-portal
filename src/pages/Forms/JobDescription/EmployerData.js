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

const EmployerData = () => {
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
            title="Employer's Description"
          >
            <label className="mt-3" htmlFor="jobDescription">
              Company Name for this Job
            </label>
            <Field
              name="jobDescription"
              id="jobDescription"
              className="form-control"
              placeholder="Enter company name"
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
              Your Role in the Hiring Process
            </label>
            <Field
              name="hoursToWork"
              id="hoursToWork"
              className="form-control"
              placeholder="Enter your role"
            />
            <ErrorMessage
              name="hoursToWork"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="pricePerHour">
              Location:
            </label>
            <Field
              name="pricePerHour"
              id="pricePerHour"
              className="form-control"
              placeholder="Enter Location"
            />
            <ErrorMessage
              name="pricePerHour"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3">Can this job be performed remotely?</label>
            <div>
              <label>
                <Field type="radio" name="picked" value="yes" className="m-2" />
                Yes
              </label>
            </div>
            <div>
              <label>
                <Field type="radio" name="picked" value="no" className="m-2" />
                No
              </label>
            </div>
            <div>
              <label>
                <Field
                  type="radio"
                  name="picked"
                  value="temporarily"
                  className="m-2"
                />
                Temporarily due to covid
              </label>
            </div>
            <br />
            <label className="mt-3">How many Hires?</label>
            <Field
              type="number"
              name="pricePerHour"
              id="pricePerHour"
              className="form-control"
              placeholder="Enter number of Hires"
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

export default EmployerData

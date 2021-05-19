import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

// import profile from "../../../assets/images/profile-img.png"
// import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  title: "",
  language: "",
  role: "select",
  size: "select",
  location: "",
  isRemote: "",
  hires: "",
}

const EmployerData = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState("")
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/company/me`,
          localStorage.getItem("token")
        )
        console.log(data)
        // if (data.profile) {
        //   setValues(data.profile.name)
        // }
        setError(null)
      } catch (err) {
        // setError(err.response)
        console.log(err)
      }
    }
    fetchData()
  }, [])
  function validate(values) {
    const errors = {}

    if (!values.title) {
      errors.title = "Required"
    }
    if (!values.hires) {
      errors.hires = "Required"
    }
    if (!values.isRemote) {
      errors.isRemote = "Required"
    }
    if (!values.language) {
      errors.language = "Required"
    }
    if (values.role === "select") {
      errors.role = "Required"
    }
    if (values.size === "select") {
      errors.size = "Required"
    }
    if (!values.location) {
      errors.location = "Required"
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
            <label className="mt-3">Company Name for this Job</label>
            <Field
              name="name"
              className="form-control"
              placeholder="Enter company name"
              disabled
            />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="jobTitle">
              Job Title:
            </label>
            <Field
              name="title"
              id="jobTitle"
              className="form-control"
              placeholder="Enter job title"
            />
            <ErrorMessage
              name="title"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="language">
              Enter language you want the post to appear in?
            </label>
            <Field
              name="language"
              id="language"
              className="form-control"
              placeholder="Enter language"
            />
            <ErrorMessage
              name="language"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="role">
              Your Role in the Hiring Process
            </label>
            <Field as="select" name="role" className="w-100">
              <option selected value="select" disabled>
                Select
              </option>
              <option value="hiringmanager">Hiring Manager</option>
              <option value="ceo">CEO/Owner</option>
              <option value="humanresource">Human Resource</option>
              <option value="assistant">Assistant Manager</option>
              <option value="teamlead">Team Lead</option>
              <option value="recruiter">Recruiter or Talent Acquisition</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3">Company Size</label>
            <Field as="select" name="size" className="w-100">
              <option selected value="select" disabled>
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
            <label className="mt-3" htmlFor="location">
              Location:
            </label>
            <Field
              name="location"
              id="location"
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
                <Field
                  type="radio"
                  name="isRemote"
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
                  name="isRemote"
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
                  name="isRemote"
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
              name="hires"
              className="form-control"
              placeholder="Enter number of Hires"
            />
            <ErrorMessage
              name="hires"
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
              <div>
                <Button color="primary" onClick={() => setRedirect(true)}>
                  See job posting here
                </Button>
              </div>
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

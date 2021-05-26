import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"
import "./Style.css"
import historyPush from "pages/HistoryPush/HistoryPush"

// import profile from "../../../assets/images/profile-img.png"
// import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  jobTitle: "",
  jobPostingLanguage: "",
  hiringRole: "select",
  size: "select",
  location: "",
  isRemoteJob: "",
  noOfHires: "",
  country: "",
}

const EmployerData = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
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
        if (data.profile) {
          initialValues.country = data.profile.country
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
  function validate(values) {
    const errors = {}

    // if (!values.jobTitle) {
    //   errors.jobTitle = "Required"
    // }
    // if (!values.noOfHires) {
    //   errors.noOfHires = "Required"
    // }
    // if (!values.isRemoteJob) {
    //   errors.isRemoteJob = "Required"
    // }
    // if (!values.jobPostingLanguage) {
    //   errors.jobPostingLanguage = "Required"
    // }
    // if (values.hiringRole === "select") {
    //   errors.hiringRole = "Required"
    // }
    // if (values.size === "select") {
    //   errors.size = "Required"
    // }
    // if (!values.location) {
    //   errors.location = "Required"
    // }

    return errors
  }
  async function handleSubmit(data) {
    let isRemote = false
    if (data.isRemoteJob === "yes") {
      data.isRemoteJob = true
    }
    if (data.isRemoteJob === "no") {
      data.isRemoteJob = false
    }
    console.log(data)
    try {
      const resData = await formPostData(
        "/company-post/first-form",
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData)
      setId(resData.data.post._id)
    } catch (err) {
      // setError(err.response.data.name)
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
        {/* <Step1 active={0} style={{ width: "60%" }} /> */}
        <Col sm={8}>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="Employer's Description"
          >
            <label className="mt-3">Country</label>
            <Field
              name="country"
              className="form-control select"
              placeholder="Enter country"
              disabled
            />

            <br />
            <label className="mt-3" htmlFor="jobTitle">
              Job Title:
            </label>
            <Field
              name="jobTitle"
              id="jobTitle"
              className="form-control select"
              placeholder="Enter job Title"
            />
            <ErrorMessage
              name="jobTitle"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="jobPostingLanguage">
              Enter Language you want the post to appear in?
            </label>
            <Field
              name="jobPostingLanguage"
              id="jobPostingLanguage"
              className="form-control select"
              placeholder="Enter Language"
            />
            <ErrorMessage
              name="jobPostingLanguage"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3">Your Role in the Hiring Process</label>
            <Field as="select" name="hiringRole" className="w-100 select">
              <option defaultValue value="select" disabled>
                Select
              </option>
              <option value="manager">Hiring Manager</option>
              <option value="owner">CEO/Owner</option>
              <option value="hr">Human Resource</option>
              <option value="assistant">Assistant Manager</option>
              <option value="recruiter">Recruiter or Talent Acquisition</option>
              <option value="other">Other</option>
            </Field>
            <ErrorMessage
              name="role"
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
              className="form-control select"
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
                  name="isRemoteJob"
                  value="yes"
                  className="m-2 "
                />
                Yes
              </label>
            </div>
            <div>
              <label>
                <Field
                  type="radio"
                  name="isRemoteJob"
                  value="no"
                  className="m-2 "
                />
                No
              </label>
            </div>
            <br />
            <label className="mt-3">How many Hires?</label>
            <Field
              type="number"
              name="noOfHires"
              className="form-control select"
              placeholder="Enter number of noOfHires"
            />
            <ErrorMessage
              name="noOfHires"
              component="div"
              style={{ color: "red" }}
            />
            <div>
              <button
                type="submit"
                className="mt-4 button-color btn btn-block waves-effect waves-light"
              >
                Submit
              </button>
            </div>
            <br />
            {/* {clicked && !error && (
              <div>
                <Button color="primary" onClick={() => setRedirect(true)}>
                  See job posting here
                </Button>
              </div>
            )} */}
            {redirect && id && historyPush("/companyInfo", id)}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default EmployerData

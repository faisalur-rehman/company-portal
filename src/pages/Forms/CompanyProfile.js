import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = {
  address: "",

  contactNumber: "",
}

const CompanyProfile = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
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
    if (!values.contactNumber) {
      errors.contactNumber = "Required"
    }
    if (!values.address) {
      errors.address = "Required"
    }

    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
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
            title="Company Details"
          >
            <label className="mt-3" htmlFor="address">
              Address:
            </label>
            <Field
              name="address"
              id="address"
              className="form-control"
              placeholder="Enter location/address"
            />
            <ErrorMessage
              name="address"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="contactNumber">
              Contact Number:
            </label>
            <Field
              name="contactNumber"
              id="contactNumber"
              className="form-control"
              placeholder="Enter Contact Details"
            />
            <ErrorMessage
              name="contactNumber"
              component="div"
              style={{ color: "red" }}
            />

            <Button type="submit" className="mt-4" color="primary">
              Submit
            </Button>
            {/* {redirect && <Redirect to="generalInformation" />} */}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default CompanyProfile

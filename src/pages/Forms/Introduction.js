import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"
import FormikComponent from "pages/Forms/Formik"

import profile from "../../assets/images/profile-img.png"
import Step1 from "pages/Trackbar/Step1"

const initialValues = { description: "", whatsappNumber: "" }

const BusinessInfo = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await formGetData(
          `/tour-guide/${localStorage.getItem("id")}`,
          localStorage.getItem("token")
        )
        if (data.tourGuide) {
          initialValues.description = data.tourGuide.description
          initialValues.whatsappNumber = data.tourGuide.whatsappNumber
          setValues(initialValues)
        }
        console.log(data)
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
    if (!values.description) {
      errors.description = "Required"
    }
    if (!values.whatsappNumber) {
      errors.whatsappNumber = "Required"
    }

    return errors
  }
  async function handleSubmit(data) {
    console.log(data)
    try {
      const resData = await formPostData(
        "/tour-guide/info",
        data,
        localStorage.getItem("token")
      )
      setError(null)
      console.log(resData.data.tourGuide._id)
      setId(resData.data.tourGuide._id)
      localStorage.setItem("id", resData.data.tourGuide._id)
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
        <Step1 active={0} style={{ width: "60%" }} />
        <Col>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="introduction"
          >
            <label className="mt-3" htmlFor="description">
              Introduction:
            </label>
            <Field
              name="description"
              id="description"
              className="form-control"
            />
            <ErrorMessage
              name="description"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="whatsappNumber">
              Whatsapp Number:
            </label>
            <Field
              name="whatsappNumber"
              id="whatsappNumber"
              className="form-control"
            />
            <ErrorMessage
              name="whatsappNumber"
              component="div"
              style={{ color: "red" }}
            />
            <Button type="submit" className="mt-4" color="primary">
              Submit
            </Button>
            {redirect && <Redirect to="generalInformation" />}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
    // </div>
  )
}

export default BusinessInfo

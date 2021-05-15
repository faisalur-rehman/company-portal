import React, { useState, useEffect } from "react"
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup,
} from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"

import { Field, ErrorMessage } from "formik"
import FormikComponent from "../Forms/Formik"

let initialValues = {
  whatsappNumber: "",
  startingPoint: "",
  town: "",
  hours: "",
  tourKind: [],
  places: [],
  // otherServices:""
}

const TourGuideForm = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  useEffect(() => {}, [])
  function validate(values) {
    const errors = {}
    if (!values.description) {
      errors.description = "Required"
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
      console.log(resData)
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
        <Col style={{ width: "60%" }}>
          <FormikComponent
            initialValues={initialValues}
            validate={validate}
            handleSubmit={handleSubmit}
            title="introduction"
          >
            <label className="mt-3" htmlFor="description">
              Your Whatsapp number:
            </label>
            <Field
              name="whatsappNumber"
              id="description"
              className="form-control"
            />
            <ErrorMessage
              name="whatsappNumber"
              component="div"
              style={{ color: "red" }}
            />
            <br />
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
            <label className="mt-3" htmlFor="startingPoint">
              Starting Point:
            </label>
            <Field
              name="startingPoint"
              id="startingPoint"
              className="form-control"
            />
            <ErrorMessage
              name="startingPoint"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="town">
              Town:
            </label>
            <br />
            <Field as="select" name="town">
              <option value="milan">Milan</option>
              <option value="rome">Rome</option>
              <option value="verona">Verona</option>
              <option value="torino">Torino</option>
              <option value="florence">Florence</option>
              <option value="venice">Venice</option>
            </Field>
            <ErrorMessage
              name="town"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label className="mt-3" htmlFor="totalHours">
              Total Hours:
            </label>
            <Field name="hours" id="totalHours" className="form-control" />
            <ErrorMessage
              name="hours"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <p>What kind of tour do you offer?</p>
            <label>
              <Field type="checkbox" name="tourKind" value="facetoface" />
              Face to face{" "}
            </label>
            <br />
            <label>
              <Field type="checkbox" name="tourKind" value="online" />
              Online
            </label>
            <ErrorMessage
              name="tourKind"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <p>Places you visit on tours</p>
            <label>
              <Field
                type="checkbox"
                className="ml-2"
                name="places"
                value="One"
              />
              One
            </label>
            <br />

            <label>
              <Field type="checkbox" name="places" value="Two" />
              Two
            </label>
            <br />
            <label>
              <Field type="checkbox" name="places" value="Three" />
              Three
            </label>
            <ErrorMessage
              name="places"
              component="div"
              style={{ color: "red" }}
            />
            <br />
            <label>
              What other services you offer to tourists with extra cost, must be
              separated by commas. You can put the price if you want them.
            </label>
            <Field as="textarea" name="otherServices" cols={48} rows={4} />
            <br />
            <Button type="submit" className="mt-4" color="primary">
              Submit
            </Button>
            {/* {redirect && <Redirect to="generalInformation" />} */}
          </FormikComponent>
        </Col>
        {/* <Col sm={2}></Col> */}
      </div>
    </div>
  )
}

export default TourGuideForm

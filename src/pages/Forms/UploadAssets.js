import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import { formGetData, formPostData, patchData } from "../Api/ApiRequest"
import { Link, Redirect } from "react-router-dom"

const initialValues = { images: [""] }

const UploadAssets = () => {
  const [value, setValues] = useState()
  const [error, setError] = useState(null)
  const [id, setId] = useState()
  const [clicked, setClicked] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [imgs, setImages] = useState([])
  //   const steps = [
  //     "Introduction",
  //     "Unique Selling Point",
  //     "Competitors",
  //     "Target Market",
  //     "Clients",
  //   ]

  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const { data } = await formGetData(
    //       "/business/introduction",
    //       localStorage.getItem("token")
    //     )
    //     console.log(data)
    //     if (data.introduction) {
    //       setId(data.introduction["_id"])
    //       initialValues.assets = data.introduction.assets
    //       initialValues.company_do = data.introduction.company_do
    //       data.introduction.products.map(
    //         (product, index) => (initialValues.products[index] = product)
    //       )
    //       setValues(initialValues)
    //     }
    //     setError(null)
    //   } catch (err) {
    //     // setError(err.response)
    //     console.log(err)
    //   }
    // }
    // fetchData()
  }, [])
  function validate(values) {
    const errors = {}

    return errors
  }
  function handleImageUpload(e) {
    let image = e.target.files[0]
    setImages(prev => [...prev, image])
  }
  async function handleSubmit(data) {
    let formData = new FormData()
    imgs.map((img, index) => formData.append(`image${index}`, img))
    console.log(data)

    try {
      if (value) {
        resData = await patchData(
          `/upload-assets/${localStorage.getItem("id")}`,

          formData,
          localStorage.getItem("token")
        )
      } else {
        resData = await formPostData(
          `/upload-assets/${localStorage.getItem("id")}`,
          formData,
          localStorage.getItem("token")
        )
      }
      setError(null)
      console.log(resData)
    } catch (err) {
      setError(err.response.data.errors[0])
      console.log(err.response)
    }
    // setClicked(true)
  }
  return (
    <div className="container">
      <Row>
        <Col sm={10}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form>
                <div className="account-pages my-5 pt-sm-5">
                  <Container>
                    <Row className="justify-content-center">
                      <Col md={8} lg={6} xl={5}>
                        <Card className="overflow-hidden">
                          <div className="bg-primary bg-soft">
                            <Row>
                              <Col xs={7}>
                                <div className="text-primary p-4">
                                  <h5 className="text-primary">
                                    Introduction !
                                  </h5>
                                </div>
                              </Col>
                              <Col className="col-5 align-self-end"></Col>
                            </Row>
                          </div>
                          <CardBody className="pt-0">
                            <div className="p-2">
                              <FieldArray name="images">
                                {({ push }) => (
                                  <div>
                                    {values.images.map((product, index) => (
                                      <div key={index}>
                                        <label>Upload Image</label>
                                        <br />
                                        <input
                                          id="file"
                                          name={`images${index}`}
                                          type="file"
                                          onChange={event => {
                                            handleImageUpload(event)
                                          }}
                                        />
                                        <br />
                                        <br />
                                        <ErrorMessage
                                          name={`images[${index}]`}
                                          component="div"
                                          style={{ color: "red" }}
                                        />
                                      </div>
                                    ))}
                                    {error && (
                                      <p style={{ color: "red" }}>{error}</p>
                                    )}
                                    <Button
                                      color="secondary"
                                      onClick={() => push("")}
                                    >
                                      Add More Images
                                    </Button>
                                    <Button
                                      color="primary"
                                      className="m-2"
                                      type="submit"
                                    >
                                      Submit
                                    </Button>
                                    {!error && clicked && (
                                      <Redirect to="uniqueSelling" />
                                    )}
                                    {/* {redirect && <Redirect to="login" />} */}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
        {/* <Col sm={2}></Col> */}
      </Row>
    </div>
    // </div>
  )
}

export default UploadAssets

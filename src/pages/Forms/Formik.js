import React from "react"
import { Formik, Form } from "formik"
import { Row, Col, CardBody, Card, Container, Button } from "reactstrap"
import profile from "../../assets/images/profile-img.png"
const FormikComponent = props => {
  return (
    <Formik
      // enableReinitialize={true}
      initialValues={props.initialValues}
      validate={props.validate}
      onSubmit={props.handleSubmit}
    >
      {values => (
        <div className="account-pages my-5 pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col>
                {/* <Col  md={8} lg={6} xl={5}> */}
                <Card className="overflow-hidden">
                  <div className="bg-primary bg-soft">
                    <Row>
                      <Col xs={7}>
                        <div className="text-primary p-4">
                          <h5 className="text-primary">{props.title}!</h5>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        {/* <img
                          src={profile}
                          alt=""
                          className="img-fluid"
                          height="100px"
                        /> */}
                      </Col>
                    </Row>
                  </div>
                  <CardBody className="pt-0">
                    <div className="p-2">
                      <Form>{props.children}</Form>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </Formik>
  )
}

export default FormikComponent

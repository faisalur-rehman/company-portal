import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Media,
  Row,
} from "reactstrap"

// availity-reactstrap-validation
import { AvField, AvForm } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb"

import avatar from "../../assets/images/users/avatar-1.jpg"
// actions
import { editProfile, resetProfileFlag } from "../../store/actions"

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = { email: "", name: "", idx: 1, contact: "", address: "" }

    // handleValidSubmit
    this.handleValidSubmit = this.handleValidSubmit.bind(this)
  }

  // handleValidSubmit
  handleValidSubmit(event, values) {
    // this.props.editProfile(values)
    console.log(values)
  }

  componentDidMount() {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"))
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        this.setState({
          name: obj.displayName,
          email: obj.email,
          idx: obj.uid,
        })
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        this.setState({ name: obj.username, email: obj.email, idx: obj.uid })
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  // componentDidUpdate(prevProps, prevState, ss) {
  //   if (this.props !== prevProps) {
  //     const obj = JSON.parse(localStorage.getItem("authUser"))
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       this.setState({
  //         name: obj.displayName,
  //         email: obj.email,
  //         idx: obj.uid,
  //       })
  //     } else if (
  //       process.env.REACT_APP_DEFAULTAUTH === "fake" ||
  //       process.env.REACT_APP_DEFAULTAUTH === "jwt"
  //     ) {
  //       this.setState({ name: obj.username, email: obj.email, idx: obj.uid })
  //     }
  //     setTimeout(() => {
  //       this.props.resetProfileFlag();
  //     }, 3000);
  //   }
  // }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumb title="" breadcrumbItem="Profile" />

            <Row>
              <Col lg="12">
                {this.props.error && this.props.error ? (
                  <Alert color="danger">{this.props.error}</Alert>
                ) : null}
                {this.props.success && this.props.success ? (
                  <Alert color="success">{this.props.success}</Alert>
                ) : null}

                {/* <Card>
                  <CardBody>
                    <Media>
                      <div className="me-3">
                        <img
                          src={avatar}
                          alt=""
                          className="avatar-md rounded-circle img-thumbnail"
                        />
                      </div>
                      <Media body className="align-self-center">
                        <div className="text-muted">
                          <h5>{this.state.name}</h5>
                          <p className="mb-1">{this.state.email}</p>
                          <p className="mb-0">Id no: #{this.state.idx}</p>
                        </div>
                      </Media>
                    </Media>
                  </CardBody>
                </Card> */}
              </Col>
            </Row>

            <Card>
              <CardBody>
                <AvForm
                  className="form-horizontal"
                  onValidSubmit={(e, v) => {
                    this.handleValidSubmit(e, v)
                  }}
                >
                  <div className="form-group">
                    <AvField
                      name="username"
                      label="Name"
                      value={this.state.name}
                      className="form-control"
                      placeholder="Enter Name"
                      type="text"
                      required
                    />
                    <AvField name="idx" value={this.state.idx} type="hidden" />
                    <br />
                    <AvField
                      name="email"
                      label="Email"
                      value={this.state.email}
                      className="form-control"
                      placeholder="Enter Email"
                      type="email"
                      required
                    />
                    <br />
                    <AvField
                      name="address"
                      label="Address"
                      value={this.state.address}
                      className="form-control"
                      placeholder="Enter Address"
                      type="text"
                      required
                    />
                    <br />
                    <AvField
                      name="contact"
                      label="Contact Number"
                      value={this.state.contact}
                      className="form-control"
                      placeholder="Enter contact Number"
                      type="number"
                      required
                    />
                  </div>
                  <div className="text-center mt-4">
                    <Button type="submit" color="danger">
                      Edit Profile
                    </Button>
                  </div>
                </AvForm>
              </CardBody>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

UserProfile.propTypes = {
  editProfile: PropTypes.func,
  error: PropTypes.any,
  success: PropTypes.any,
}

const mapStateToProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStateToProps, { editProfile, resetProfileFlag })(UserProfile)
)

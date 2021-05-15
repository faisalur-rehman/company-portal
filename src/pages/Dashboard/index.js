import React, { Component } from "react"
import {
  Container,
} from "reactstrap"

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <h3>Dashboard</h3>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

export default Dashboard;

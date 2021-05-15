import React from "react"
import "./AdminView.css"
// import { Admin, Resource, ListGuesser } from "react-admin"
// import jsonServerProvider from "ra-data-json-server"

//connect the data provider to the REST endpoint
// const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com")

function AdminView() {
  return (
    <div className="page-content profiles">
      <div className="col sm-2"></div>
      <div className="col-sm-2" style={{ border: "1px solid black" }}>
        <div className="company">Div1</div>
        <div className="company">Div2</div>
        <div className="company">Div3</div>
      </div>
      <div className="col-sm-6" style={{ border: "1px solid black" }}>
        this is great
      </div>
      <div className="col-sm-2"></div>
    </div>
  )
}

export default AdminView

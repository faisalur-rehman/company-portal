import { useState } from "react"
import { css } from "@emotion/react"
import BeatLoader from "react-spinners/BeatLoader"

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 50px auto;
  border-color: red;
`

function Loader({ loading }) {
  let [color] = useState("#ffffff")

  return (
    <div className="sweet-loading">
      <BeatLoader color={color} loading={loading} size={15} />
    </div>
  )
}

export default Loader

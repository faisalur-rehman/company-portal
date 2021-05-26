import { useHistory } from "react-router-dom"

const historyPush = url => {
  const history = useHistory()
  return history.push(`${url}`)
}
export default historyPush

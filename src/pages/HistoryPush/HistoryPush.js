import { useHistory } from "react-router-dom"

const historyPush = (url, data) => {
  console.log(data)
  const history = useHistory()
  if (data) return history.push({ pathname: `${url}`, state: { id: data } })
  else return history.push(`${url}`)
}
export default historyPush

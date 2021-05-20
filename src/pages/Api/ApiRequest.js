import axios from "axios"

const api = axios.create({
  baseURL: "https://company-portal-app.herokuapp.com/",
})

export async function postData(endpoint, data) {
  return api.post(`${endpoint}`, {
    ...data,
  })
}
export async function formPostData(endpoint, data, token) {
  return api.post(
    `${endpoint}`,
    {
      ...data,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
}

export async function formGetData(endpoint, token) {
  return api.get(`${endpoint}`, {
    headers: {
      "x-auth-token": token,
    },
  })
}
export async function patchData(endpoint, data, token) {
  return api.patch(
    `${endpoint}`,
    { ...data },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  )
}

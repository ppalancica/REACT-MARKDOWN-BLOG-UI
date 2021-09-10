import axios from 'axios'

const authAxios = axios.create()

authAxios.interceptors.request.use(config => {
  const newConfig = config
  const token = localStorage.getItem("token")
  console.log(token)
  newConfig.headers = {
    "Authorization": `Token ${token}`
  }
  return newConfig
})

export { authAxios }

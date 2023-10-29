import { notifications } from '@mantine/notifications'
import axios, { AxiosResponse } from 'axios'
import { getSession } from '../utils';

export { AxiosError } from 'axios'

const http = axios.create()

const token = getSession();

console.log(token);


http.interceptors.request.use(
  request => {
    // @ts-ignore
    request.headers = {
      ...request.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }

    return request
  },

  error => Promise.reject(error)
)

http.interceptors.response.use(null, err => {
  const response = err?.response || ({} as AxiosResponse)

  const { data } = response || {}

  if (data?.detail) notifications.show({ message: data?.detail, color: 'red' })

  return Promise.reject(response)
})


export default http;
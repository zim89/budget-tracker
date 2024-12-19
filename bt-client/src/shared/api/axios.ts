import axios from 'axios'
import { getContentType } from './api.helpers'

const axiosOptions = {
  baseURL: 'http://localhost:4000/api',
  headers: getContentType(),
  withCredentials: true,
}

export const instanceBase = axios.create(axiosOptions)

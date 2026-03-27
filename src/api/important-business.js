import { http } from './http'

export const getBusinessCircleAnalysis = data => http.get('/business/getBusinessCircleAnalysis', data)

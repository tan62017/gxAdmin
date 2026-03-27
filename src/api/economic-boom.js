import { http } from './http'

export const getEconomicSituation = data => http.get('/business/getEconomicSituation', data)

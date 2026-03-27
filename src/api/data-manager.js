import { http } from './http'

export const industrySituation = data => http.post('/data/manager/industrySituation', data)

export const industrySituationExport = data =>
  http.post('/data/manager/industrySituationExport', data, { responseType: 'arraybuffer', returnRaw: true })

export const enterpriseManagerSituation = data => http.post('/data/manager/enterpriseSituation', data)

export const enterpriseSituationExport = data =>
  http.post('/data/manager/enterpriseSituationExport', data, { responseType: 'arraybuffer', returnRaw: true })

export const enterpriseSituationSelect = data => http.post('/data/manager/enterpriseSituationSelect', data)

export const enterpriseSituationExportWord = data =>
  http.post('/data/manager/enterpriseSituationExportWord', data, { responseType: 'arraybuffer', returnRaw: true })

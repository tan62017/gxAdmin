import { AUTHORITY_KEY, http, http2, http3 } from './http'

export const getTop10TradeIncrease = data => http2.post('/qianhai-economic-indus-oll-m/getTop10TradeIncrease', data)

export const getTrendAnalyse = data => http2.post('/qianhai-economic-indus-oll-m/getTrendAnalyse', data)

// 十大行业-工业-工业结构分析
export const getStructuralAnalysis = data => http2.get('/qianhai-economic-indus-detail-m/getStructuralAnalysis', data)

// 十大行业-- 指标总体分析   rptM,indusName
export const getTradeAnalyse = data => http2.post('/qianhai-economic-indus-oll-m/getTradeAnalyse', data)

// 百强企业查询分页
export const getTopEntListPage = data => http2.post('/qianhai-economic-ent-con-m/getTopEntListPage', data)

// 百强企业查询下拉
export const getTopEntSelect = data => http2.post('/qianhai-economic-ent-con-m/getTopEntSelect', data)

export const getEnterprisePartThree = data => http2.get(`/qianhai-economic-ent-mark-m/getEnterprisePartThree`, data)

export const getEnterprisePartTwo = data => http2.get(`/qianhai-economic-ent-mark-m/getEnterprisePartTwo`, data)

export const getEnterpriseInfoNew = data => http2.get(`/qianhai-economic-ent-mark-m/getEnterpriseInfoNew`, data)

export const getServiceRecords = data => http2.get(`/qianhai-economic-ent-mark-m/getServiceRecords`, data)

export const getEnterprisePartFour = data => http2.get(`/qianhai-economic-ent-mark-m/getEnterprisePartFour`, data)

export const getStatCreditProd = data => http3.post(`/statCreditProd?${AUTHORITY_KEY}`, data)

export const getEntIdByName = data => http2.get('/qianhai-economic-ent-mark-m/getEntIdByName', data)

export const getWandeSessionId = phone => http2.get(`/wande-login/getWandeSessionId/${phone}`, {}, { returnRaw: true })

export const getEnterpriseList = data => http2.post('/qianhai-economic-ent-mark-m/getEnterpriseList', data)

export const getTbContCharRank = data => http.get('/business/getTbContCharRank', data)

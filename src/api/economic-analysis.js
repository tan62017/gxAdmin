import { http } from './http'

export const getTemplateList = data => http.post('/tb-analysis-template/getTemplateList', data)
export const deleteTemplate = data => http.get('/tb-analysis-template/deleteTemplate', data)
export const getReportList = data => http.post('/tb-analysis-report/getReportList', data)
export const deleteReport = data => http.get('/tb-analysis-report/deleteReport', data)
export const getManualList = data => http.post('/tb-analysis-manual/getManualList', data)
export const getAgileCount = data => http.post('/tb-cont-inv-qtly/getAgileCount', data)
export const getAgileList = data => http.post('/tb-cont-inv-qtly/getAgileList', data)
export const getAgileIndex = data => http.get('/tb-cont-inv-qtly/getAgileIndex', data)
export const saveOrUpdateReport = (data) =>
  http.post("/tb-analysis-report/saveOrUpdateReport", data);
export const saveOrUpdateTemplate = (data) =>
  http.post("/tb-analysis-template/saveOrUpdateTemplate", data);
export const getReportInfo = (data) =>
  http.get("/tb-analysis-report/getReportInfo", data);
export const deleteReportDetail = (data) =>
  http.get("/tb-analysis-report-detail/deleteReportDetail", data);
export const saveOrUpdateManual = (data) =>
  http.post("/tb-analysis-manual/saveOrUpdateManual", data);
export const uploadHead = (data) => http.post("/tb-analysis-manual/uploadHead", data,{
  "Content-Type":"multipart/form-data"
});
export const getManualInfo = (data) =>
  http.get("/tb-analysis-manual/getManualInfo", data);

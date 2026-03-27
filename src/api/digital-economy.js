import { http } from "./http";

export const queryEconomyByCondition = (data) =>
  http.post("/tb-cont-economy-con-y/queryEconomyByCondition", data);

export const queryTbContEconomyIndusPorYByCondition = (data) =>
  http.post(
    "/tb-cont-economy-indus-por-y/queryTbContEconomyIndusPorYByCondition",
    data
  );

export const queryAllArea = (data) =>
  http.get("/tb-cont-economy-indus-por-y/queryAllArea", data);

export const getEnterpriseReporting = (data) =>
  http.post("/tb-cont-rpt-sum-m/getEnterpriseReporting", data);
export const buildTree = (data) =>
  http.post("/tb-cont-city-code/buildTree", data);

export const queryAllIndexName = (data) =>
  http.get("/tb-cont-tgt-oll-m/queryAllIndexName", data);
//主要经济指标
export const queryIndexPageByCondition = (data) =>
  http.post("/tb-cont-tgt-oll-m/queryPageByCondition", data);
//企业查询
export const queryEntPageByCondition = (data) =>
  http.post("/tb-cont-ent-mark-m/queryPageByCondition", data);
//十大行业查询
export const queryIndusPageByCondition = (data) =>
  http.post("/tb-cont-area-indus-m/queryPageByCondition", data);

export const queryAllEntType = (data) =>
  http.get("/tb-cont-ent-mark-m/queryAllEntType", data);

export const queryAreaIndex = (data) =>
  http.get("/tb-cont-area-indus-m/queryAreaIndex", data);

export const queryTotalByCondition = (data) =>
  http.post("/tb-cont-ent-reptd-m/queryTotalByCondition", data);
export const queryIndustName = (data) =>
  http.get("/tb-cont-ent-reptd-m/queryIndustName", data);

  //根据所属行业获取企业上报列表
export const queryPageByCondition = (data) =>
  http.post("/tb-cont-ent-reptd-m/queryPageByCondition", data);
  //企业上报获取月份表头
  export const queryRptMaxMin = (data) =>
    http.post("/tb-cont-ent-reptd-m/queryRptMaxMin", data);
  //企业填报
  export const updateBatchTB = (data) =>
    http.post("tb-cont-ent-reptd-m/updateBatchTB", data);
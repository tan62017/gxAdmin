import { http } from "./http";

export const getUserList = (data) => http.post("/auth/getUserList", data);

export const addRole = (data) => http.post("/auth/addRole", data);

export const getRoleList = (data) => http.post("/auth/getRoleList", data);

export const getPermissionList = (data) =>
  http.post("/auth/getPermissionList", data);

export const addRolePermission = (data) =>
  http.post("/auth/addRolePermission", data);

export const getRolePermissionList = (data) =>
  http.post("/auth/getRolePermissionList", data);

export const addUserRolePermission = (data) =>
  http.post("/auth/addUserRolePermission", data);

export const updateRoleStatus = (data) =>
  http.post("/auth/updateRoleStatus", data);

export const deleteRole = (data) => http.post("/auth/deleteRole", data);

export const getUserListByRoleId = (data) =>
  http.get("/auth/getUserListByRoleId", data);

export const addRoleUser = (data) => http.post("/auth/addRoleUser", data);

export const getPermissionListByRoleId = (data) =>
  http.get("/auth/getPermissionListByRoleId", data);

export const addRolePermissionByRoleId = (data) =>
  http.post("/auth/addRolePermissionByRoleId", data);

export const getAclList = (data) => http.post("/auth/acl/getAclList", data);

export const addAcl = (data) => http.post("/auth/acl/addAcl", data);

export const delAcl = (data) => http.post("/auth/acl/delAcl", data);

export const addAuthUser = (data) => http.post("/auth/user/addAuthUser", data);

export const delAuthUser = (data) => http.post("/auth/user/delAuthUser", data);

export const checkToken = (data) =>
  http.get("/third-auth/login/checkTokenStatus", data);

export const getUserInfoByToken = (data) =>
  http.get("/third-auth/user/getUserInfoByToken", data);

// export const login = data => http.post('/auth/user/login', data, { returnRaw: true })
export const login = (data) => {
  return Promise.resolve({
    data: {
      code: 200,
      data: "super64f549fed8a14057926358a635f",
      message: "登陆成功",
    },
    // err: { message: "登陆成功" },
  });
};

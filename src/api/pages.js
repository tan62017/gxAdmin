import Http from '@/http';

// const Http = new http();

export const getPagesList = () => {
  return Http.get('/api/pages');
};

export const pageAddView = (id) => {
  return Http.post(`/api/pages/${id}/view`);
};

export const pageEdit = (id, data, config) => {
  console.log(data);
  // return

  return Http.put(`/api/pages/${id}`, data, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
    },
    transformRequest: [(data) => data],
    ...config,
  });
};

export const pageAdd = (data, config) => {
  return Http.post(`/api/pages`, data, {
    headers: {
      // 'Content-Type': 'multipart/form-data',
    },
    transformRequest: [(data) => data],
    ...config,
  });
};

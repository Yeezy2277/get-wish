import { $authHost } from './index';

export const defaultConfig = {
  headers: { 'Content-Type': 'application/json' },
};

export function CRUD(baseUrl) {
  const API = '/api/v1';

  return {
    search() {
      return parseResponse(
        $authHost.get(`${API}/${baseUrl}`)
      );
    },
    searchFilter(params = {}) {
      return parseResponse(
        $authHost.post(`${API}/${baseUrl}/query`, params, defaultConfig)
      );
    },
    get(id) {
      return parseResponse($authHost.get(`${API}/${baseUrl}/${id}`));
    },
    create(data) {
      return parseResponse(
        $authHost.post(`${API}/${baseUrl}`, data, defaultConfig)
      );
    },
    edit(id, data) {
      return parseResponse(
        $authHost.put(`${API}/${baseUrl}/${id}`, data, defaultConfig)
      );
    },
    delete(id) {
      return parseResponse(
        $authHost.delete(`${API}/${baseUrl}/${id}`, defaultConfig)
      );
    },
  };
}

export function parseResponse(promise) {
  return new Promise((resolve, reject) => {
    promise
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(parseError(error));
      });
  });
}

export function parseError(error) {
  return (
    error.response?.data?.message
    || (error.response?.data?.errors && error.response?.data?.errors?.length
      ? error.response.data.errors.join(', ')
      : error.message)
  );
}

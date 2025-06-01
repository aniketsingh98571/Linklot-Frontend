import api from "./axios";

interface RequestConfig {
  url: string;
  params?: Record<string, unknown>;
  data?: unknown;
  headers?: Record<string, string>;
}

export const get = async ({ url, params, headers }: RequestConfig) => {
  const response = await api.get(url, { params, headers });
  return response.data;
};

export const post = async ({ url, data, headers }: RequestConfig) => {
  const response = await api.post(url, data, { headers });
  return response.data;
};

export const put = async ({ url, data, headers }: RequestConfig) => {
  const response = await api.put(url, data, { headers });
  return response.data;
};

export const patch = async ({ url, data, headers }: RequestConfig) => {
  const response = await api.patch(url, data, { headers });
  return response.data;
};

export const del = async ({ url, params, headers }: RequestConfig) => {
  const response = await api.delete(url, { params, headers });
  return response.data;
};

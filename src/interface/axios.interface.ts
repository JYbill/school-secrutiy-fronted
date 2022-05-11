export interface AxiosConfig {
  url: string;

  method: 'GET' | 'POST' | 'DELETE' | 'PUT';

  params?: any;

  data?: any;

  headers?: { 'Content-Type': 'multipart/form-data' } | any
}

export interface Result {
  code: 400 | 200 | number;

  data: null | any;

  msg: string;

  success: boolean;
}
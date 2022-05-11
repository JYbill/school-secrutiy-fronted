import { AxiosConfig } from '@/interface/axios.interface';
import axios from 'axios';

export function request(config: AxiosConfig): Promise<any> {
  //创建一个axios实例，以及设置公共属性
  const instance1 = axios.create({
    baseURL: 'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules',
    timeout: 5000
  });

  //请求成功拦截
  // instance1.interceptors.request.use(success => {
  //   return success;
  // }, err => {
  // })
  // //响应成功拦截
  instance1.interceptors.response.use(res => {
    return res.data;
  }, err => Promise.resolve(err));
  //返回Promise
  return instance1(config);


}

export function school(config: AxiosConfig): Promise<any> {
  //创建一个axios实例，以及设置公共属性
  const instance1 = axios.create({
    baseURL: '/api',
    timeout: 5000
  });

  //请求成功拦截
  // instance1.interceptors.request.use(success => {
  //   return success;
  // }, err => {
  // })
  // //响应成功拦截
  instance1.interceptors.response.use(res => {
    return res.data;
  }, err => Promise.resolve(err));
  //返回Promise
  return instance1(config);
}

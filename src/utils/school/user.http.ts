import { request } from '../http';
import { school } from '../http';

export class UserHttp {

  /**
   * 用户登录
   */
  static login(username: string, password: string) {
    return school({
      url: '/user/login',
      method: 'POST',
      data: {
        username,
        password
      }
    });
  }


  /**
   * 用户注册
   * @param username 
   * @param password 
   */
  static register(username: string, password: string) {
    return school({
      url: '/user/add',
      method: 'POST',
      data: {
        username,
        password
      }
    });
  }


  /**
   * 查询所有用户
   */
  static findAll() {
    return school({
      url: '/user/all',
      method: 'GET'
    });
  }


  /**
   * 添加用户
   */
  static insertUser(username: string, password: string) {
    return school({
      url: '/user/add',
      method: 'POST',
      data: {
        username, password
      }
    });
  }


  /**
   *  更新用户
   */
  static updateUser(user: any) {
    return school({
      url: '/user/update',
      method: 'PUT',
      data: {
        username: user.username,
        password: user.password,
        id: user.id,
        admin: user.admin
      }
    })
  }



  /**
 *  更新用户
 */
  static deleteUser(id: string) {
    return school({
      url: `/user/del`,
      method: 'DELETE',
      params: {
        id
      }
    })
  }
}
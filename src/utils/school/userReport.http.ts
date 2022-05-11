import { school } from '../http';

export class UserReportHttp {

  /**
   * 用户全部举报
   */
  static getAll() {
    return school({
      url: '/inform',
      method: 'GET'
    });
  }


  /**
   * 更新用户举报状态
   * @param uid 
   * @returns 
   */
  static updateUserReportStatus(uid: string) {
    return school({
      url: `/inform/${uid}`,
      method: 'PUT'
    });
  }

  /**
   * 新增用户举报
   * @param userReport 
   * @returns 
   */
  static addUserReport(formData: any) {
    return school({
      url: '/inform',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData
    });
  }


  /**
   * 删除用户举报
   * @param id 
   * @returns 
   */
  static deleteUserReport(id: string) {
    return school({
      url: `/inform/${id}`,
      method: 'DELETE'
    });
  }
}
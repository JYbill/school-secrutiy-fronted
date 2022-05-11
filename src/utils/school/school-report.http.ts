import { school } from '../http';

export class SchoolReportHttp {

  /**
   * GET 查询所有报告
   */
  static getAll() {
    return school({
      url: '/report/all',
      method: 'GET'
    });
  }

  /**
   * PUT 修改学校报告文章
   * @param userId 
   * @param schoolArticleId 
   * @returns 
   */
  static updateSchoolReport(userId: string, schoolArticleId: string) {
    return school({
      url: '/report/update',
      method: 'PUT',
      params: { userId, schoolArticleId }
    })
  }

  /**
 * POST 新增报告
 * @param userId 
 * @param schoolArticleId 
 * @returns 
 */
  static insertSchoolReport(userId: string, schoolArticleId: string) {
    return school({
      url: '/report',
      method: 'POST',
      data: { userId, schoolArticleId }
    })
  }
}
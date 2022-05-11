import { school } from '../http';

export class SecurityHttp {

  /**
   * 用户登录
   */
  static getAll() {
    return school({
      url: '/security/all',
      method: 'GET'
    });
  }

  /**
   * DELETE 删除安全文章
   * @param id 
   * @returns 
   */
  static deleteSecurity(id: number) {
    return school({
      url: '/security/delete',
      method: 'DELETE',
      params: { id }
    });
  }

  /**
   * POST 新增安全文章
   * @param item 
   * @returns 
   */
  static insertSecurity(item: any) {
    return school({
      url: '/security/add',
      method: 'POST',
      data: {
        title: item.title,
        content: item.content,
        images: item.images
      }
    })
  }

  /**
   * PUT 修改安全文章
   * @param item 
   * @returns 
   */
  static updateSecurity(item: any) {
    return school({
      url: '/security/update',
      method: 'PUT',
      data: {
        id: item.id,
        title: item.title,
        content: item.content,
        images: item.images
      }
    })
  }
}
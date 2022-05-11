import { school } from '../http';

export class InfoHttp {

  /**
   * GET 所有通知
   */
  static getAll() {
    return school({
      url: '/info',
      method: 'GET'
    });
  }

  /**
   * DELETE 删除通知
   * @param id 
   * @returns 
   */
  static delete(id: string) {
    return school({
      url: `/info/${id}`,
      method: 'DELETE'
    });
  }

  /**
   * POST 新增通知
   * @param item 
   * @returns 
   */
  static insert(item: any) {
    return school({
      url: '/info',
      method: 'POST',
      data: {
        title: item.title,
        information: item.information
      }
    })
  }

  /**
   * PUT 修改通知
   * @param item 
   * @returns 
   */
  static update(item: any) {
    return school({
      url: '/info',
      method: 'PUT',
      data: {
        id: item.id,
        title: item.title,
        information: item.information
      }
    })
  }
}
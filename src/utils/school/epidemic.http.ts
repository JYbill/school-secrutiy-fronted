import { school } from '../http';

export class EpidemicHttp {

  /**
   * 所有疫情
   */
  static getAll() {
    return school({
      url: '/epidemic/all',
      method: 'GET'
    });
  }

  /**
    * POST 新增疫情文章
    * @param item 
    * @returns 
    */
  static insertEpidemic(item: any) {
    return school({
      url: '/epidemic/add',
      method: 'POST',
      data: {
        title: item.title,
        content: item.content,
        images: item.images
      }
    })
  }

  /**
   * PUT 修改疫情文章
   * @param item 
   * @returns 
   */
  static updateEpidemic(item: any) {
    return school({
      url: '/epidemic/update',
      method: 'PUT',
      data: {
        id: item.id,
        title: item.title,
        content: item.content,
        images: item.images
      }
    })
  }

  /**
   * DELETE 删除学校文章
   * @param id 
   * @returns 
   */
  static deleteEpidemic(id: number) {
    return school({
      url: '/epidemic/delete',
      method: 'DELETE',
      params: { id }
    })
  }
}
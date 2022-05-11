import { school } from '../http';

export class SchoolHttp {

  /**
   * 查询所有学校文章
   */
  static getAll() {
    return school({
      url: '/school/all',
      method: 'GET'
    });
  }


  /**
   * 新增学校文章
   * @param item 
   * @returns 
   */
  static insertSchool(item: any) {
    // console.log(item);
    return school({
      url: '/school/add',
      method: 'POST',
      data: {
        title: item.title,
        content: item.content,
        images: item.images
      }
    })
  }

  /**
   * PUT 修改学校文章
   * @param item 
   * @returns 
   */
  static updateSchool(item: any) {
    return school({
      url: '/school/update',
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
  static deleteSchool(id: number) {
    return school({
      url: '/school/delete',
      method: 'DELETE',
      params: { id }
    })
  }
}
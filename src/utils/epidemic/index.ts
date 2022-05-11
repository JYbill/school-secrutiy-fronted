import { request } from '../http';

export class Epidemic {

  /**
   * 获取昨天疫情信息
   */
  static getInformation() {
    return request({
      url: '/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare',
      method: 'POST'
    });
  }

}
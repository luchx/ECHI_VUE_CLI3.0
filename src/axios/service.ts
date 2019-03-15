import axios from './config';

// HTTP工具类
export default class Http {
  public static async request(params: any) {
    return await axios(params);
  }

  /**
   * get
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static get(req: any): any {
    return this.request({
      method: 'GET',
      url: `/${req.url}`,
      params: req.data,
    });
  }

  /**
   * put
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static put(req: any): any {
    return this.request({
      method: 'PUT',
      url: `/${req.url}`,
      data: req.data,
    });
  }

  /**
   * post
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static post(req: any): any {
    return this.request({
      method: 'post',
      url: `/${req.url}`,
      data: req.data,
    });
  }

  /**
   * delete
   * @param [url] 地址
   * @param [data] 数据
   * @returns Promise
   */
  public static delete(req: any): any {
    return this.request({
      method: 'DELETE',
      url: `/${req.url}`,
      params: req.data,
    });
  }
}
/**
 * wxapi.js
 *
 * Copyright (c) 2017 AppSite
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 * @category   AppSite
 * @package    appsite-client-sdk
 * @copyright  Copyright (c) 2017 AppSite (http://www.appsite.club)
 * @license    http://www.apache.org/licenses/LICENSE-2.0 Apache Licence 2.0
 * @version    1.0, 2017-09-30
 * @author	   zhangsy
 * @wechat	   mysticalyoung
 * @qq         1918305162
 */

'use strict';
import * as utils from './utils';
import { constants } from './constants';

const noop = function noop() { };
class WXApi {
  constructor(){}

  //+++++++++++++发起网络请求[wx.request(OBJECT)]++++++++++++++
  request(options) {
    // hook 参数传递的回调函数
    options = options || {};

    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;

    return new Promise(
      (resolve, reject) => {
        wx.request(utils.extend({}, options, {
          success: (res) => {
            resolve(res);
            success(res);
          },
          fail: (res) => {
            reject(res);
            fail(res);
          },
          complete: complete
        }));
      }
    );
  }

  //+++++++++++++调起客户端小程序设置界面[wx.openSetting(OBJECT)]+++++++++++++
  openSetting(options) {
    options = options || {};
    var success = options.success || noop;
    var fail = options.fail || noop;
    var complete = options.complete || noop;
    return new Promise(
      (resolve, reject) => {
        wx.openSetting({
          success: (res) => {
            resolve(res);
            success(res);
          },
          fail: (res) => {
            reject(res);
            fail(res);
          },
          complete: complete
        })
      }
    )
  }


  /*****************************************************************/
  /*                      以下函数定义对微信API的扩展                  */
  /*****************************************************************/

  // 测试小程序设置信息
  testAppSetting(setting) {
    var scope = this;
    return new Promise(
      (resolve, reject) => {
        if (utils.compatibleTest(wx.getSetting, (res) => {
          reject(new Error('[wx.getSetting]' + constants.ERR_LOWVERSION))
        }, scope)) {
          wx.getSetting({
            success: (res) => {
              resolve(res.authSetting[setting])
            },
            fail: (res) => {
              reject(res)
            }
          })
        }
      }
    )
  }

}

var wxApi = new WXApi();

export { wxApi };
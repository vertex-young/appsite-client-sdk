/**
 * opensetting.js
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

let app = getApp();
import * as utils from './utils';

// 默认的放置路径
const openSettingRoute = 'vendor/appsite-client-sdk/pages/opensetting/opensetting';

var openSetting = function (options) {
  let openSettingUrl = utils.format('/{0}?title={1}&scope={2}', openSettingRoute, '设置', options.scope);
  let currentPages = getCurrentPages();
  let goSetting = false;

  if (options.path && options.path.indexOf(openSettingRoute)<0) {
    openSettingUrl = utils.urlAppend(openSettingUrl, utils.format('cp={0}', options.path));
  }

  if (currentPages.length > 0) {
    let route = currentPages[currentPages.length - 1].route;
    if (route.lastIndexOf(openSettingRoute) < 0) {
      goSetting = true;
    }
  } else {
    goSetting = true;
  }

  if (goSetting) {
    setTimeout(function () {
      wx.redirectTo({
        url: openSettingUrl,
        fail: function (e) {
          utils.logger.error(e);
        }
      });
    }, 10);
  }
};

export {
  openSetting
}
/**
 * index.js
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

import { AppSite, qcloud } from './lib/appsite';

import { Stat } from './lib/stat';
import { wxApi } from './lib/wxapi';
import { wxUser } from './lib/wxuser';

// 加载date package
import { DateExtras } from './lib/date';

//--加载打开设置页面--
import { openSetting } from './lib/opensetting';

import * as utils from './lib/utils';

//--加载页面处理函数--
import { asTapTabbarItem } from './pages/bar/tabbar';
import { asCarouselChange } from './pages/carousel/carousel';
import * as category from './pages/category/category';

module.exports = {
  AppSite: AppSite,
  utils: utils,
  wxApi: wxApi,
  wxUser: wxUser,
  qcloud: qcloud,
  openSetting: openSetting,

  asTapTabbarItem: asTapTabbarItem,
  asCarouselChange: asCarouselChange,
  asCategoryScroll: category.asCategoryScroll,
  asTapCategoryItem: category.asTapCategoryItem
};

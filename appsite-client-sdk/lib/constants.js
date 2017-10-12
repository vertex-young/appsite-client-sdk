/**
 * constants.js
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


module.exports = {
    KEY_USERINFO: 'UserInfo',
    ERR_UNKNOWN: '未知错误',
    ERR_ISLOGIN: '正在登录',
    ERR_LOWVERSION:'当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',

    MP_SCOPE :{
      'scope.userInfo':'用户信息',
      'scope.userLocation':'地理位置',
      'scope.address':'通讯地址',
      'scope.invoiceTitle': '发票抬头',
      'scope.werun': '微信运动步数',
      'scope.record': '录音功能',
      'scope.writePhotosAlbum': '保存到相册'
    }
};
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

import { wxApi, AppSite, utils } from '../../index';
const openSettingRoute = 'vendor/appsite-client-sdk/pages/opensetting';

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData(query || {});
    if (query && query.scope) {
      let scopes = query.scope.split(',');
      let mpScopes = AppSite['MP_SCOPE'];
      let scopeInfo = [];
      for (var i in scopes) {
        var s = utils.trim(scopes[i]);
        var info = mpScopes[s];
        scopeInfo.push(info);
        this.setData({ scopeInfo: scopeInfo });
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var data = this.data;
    // 在页面渲染完成之后再设置导航条标题，否则可能设置失败
    if (data.title) {
      wx.setNavigationBarTitle({
        title: data.title
      })
    }
  },
  onTapOpenSetting: function () {
    var me = this;
    wxApi.openSetting().then(function (res) {
      var authSetting = res.authSetting;
      var scopes = (me.data.scope || '').split(',');
      var authed = true;
      for (var i in scopes) {
        var setting = authSetting[scopes[i]];
        authed = authed && setting;
        if (!authed) break;
      }

      // 如果授权成功
      if (authed) {
        var pathUrl = '/';
        var query = me.data.query;
        var launchOpts = AppSite.launchOpts;
        if (query && query.cb) {
          pathUrl = utils.format('/{0}', query.cb || '');
        } 
        if(pathUrl == '/' || pathUrl.indexOf(openSettingRoute)>=0) {
          query = AppSite.apply({}, launchOpts.query);
          pathUrl = utils.format('/{0}', launchOpts.path || '');
        }

        if (launchOpts.scene) {
          query = AppSite.apply(query, { scene: launchOpts.scene });
        }

        if (pathUrl !== '/') {
          pathUrl = utils.urlAppend(pathUrl, utils.toQueryString(query));
          setTimeout(function () {
            wx.reLaunch({
              url: pathUrl,
            })}, 100);
        }
      }
    })
  }
})
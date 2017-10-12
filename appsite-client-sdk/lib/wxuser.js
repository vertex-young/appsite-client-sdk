/**
 * wxuser.js
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
import * as appsite from './appsite';
import * as utils from './utils';

import { wxApi } from './wxapi';

let constants = require('./constants');


let AppSite = appsite.AppSite;
let qcloud = appsite.qcloud;

class WXUser {
  constructor(){
    try {
      var userInfo = wx.getStorageSync(constants.KEY_USERINFO);
      if (userInfo) {
        this.userInfo = userInfo;
      }
    } catch (e) {
    }
  }
  // 获得用户信息
  getUserInfo() {
    if (this.userInfo) {
      return this.userInfo;
    }
    return null;
  }

  // 设置用户信息并存储到本地数据
  setUserInfo(userInfo) {
    this.userInfo = userInfo;
    wx.setStorageSync(constants.KEY_USERINFO, userInfo);
  }

  // 微信登录
  login(options) {
    options = options || {};
    var me = this;
    var s = options.success || AppSite.emptyFn;
    var f = options.fail || AppSite.emptyFn;
    var u = options.unauth || AppSite.emptyFn;
    var success = function(){
      me.isLogin = false;
      s.apply(this, arguments);
    };
    var fail = function () {
      me.isLogin = false;
      f.apply(this, arguments);
    };
    var unauth = function () {
      me.isLogin = false;
      u.apply(this, arguments);
    };

    var opensetting = options.opensetting || false;
    var config = AppSite.config;

    // 如果已经有登录在先，则退出
    // 使用isLogin做登录同步信号
    if(me.isLogin) {
      fail(constants.ERR_ISLOGIN);
      return false;
    }
    me.isLogin = true;
    var doLogin = function () {
      qcloud.login({
        success: (result) => {
          if (result) {
            success(result);
            me.setUserInfo(result);
          } else {
            // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
            qcloud.request({
              url: config.service.userUrl,
              login: true,
              success(result) {
                success(result.data.data);
                me.setUserInfo(result.data.data);
              },
              fail(error) {
                fail(error);
              }
            })
          }
        },
        fail: (error) => {
          fail(error);
          if (error && error.detail && error.detail.errMsg === 'getUserInfo:fail auth deny'){
            unauth(error);
          }
        }
      });
    };
    wxApi.testAppSetting('scope.userInfo').then(
      function (res) {
        if (res == true) {
          // 已经授权
          doLogin();
        } else if (res == false) {
          // 没有授权
          if (opensetting){
            wxApi.openSetting().then(
              (res) => {
                var authSetting = res && res.authSetting ? res.authSetting : {};
                if (authSetting && authSetting['scope.userInfo'] == false) {
                  // 用户没有启用用户信息授权
                  // 做用户没有开启获取用户信息的授权
                  unauth(res);
                } else {
                  doLogin();
                }
              },
              (res) => {
                unauth(res);
              }
            )
          } else {
            unauth(res);
          }
        } else {
          // 从未授权过
          doLogin();
        }
      }, AppSite.emptyFn
    )
  }

  isAuthed(options){
    options = options || {};
    var me = this;
    var success = options.success || AppSite.emptyFn;
    var fail = options.fail || AppSite.emptyFn;
    
    wxApi.testAppSetting('scope.userInfo').then(
      (authed)=>{
        success(authed);
      },
      (error)=>{
        fail(error);
      }
    );
  }
}

var wxUser = new WXUser();
export {wxUser};
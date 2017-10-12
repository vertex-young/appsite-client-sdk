/**
 * stat.js
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
let global = wx || window;

import * as utils from './utils';
import { AppSite, qcloud } from './appsite';

(function () {
  var Stat = AppSite.Stat;
  if (typeof Stat === 'undefined') {
    Stat = AppSite.Stat = {};
  }

  var app = App;
  var page = Page;

  var succeedEvent = function (target, eventName, newFn) {
    if (target[eventName]) {
      var oldFn = target[eventName];
      target[eventName] = function () {
        newFn.apply(this, arguments);
        oldFn.apply(this, arguments);
      };
    } else {
      target[eventName] = function () {
        newFn.apply(this, arguments);
      };
    }
  };

  var infoEvent = function(msg, args){
    let options = args.length > 0 ? args[0] : null;
    let message = utils.isEmpty(options) ? msg : utils.format('{0}, options:{1}', msg, JSON.stringify(options));
    
    utils.logger.info(message);
  };

  var appOnLaunch = function (options) {
    // 打印 app onlaunch 参数信息
    infoEvent('app on launch', arguments);

    let launchOpts = options || {};
    AppSite.launchOpts = AppSite.launchOpts || {};
    AppSite.apply(AppSite.launchOpts, launchOpts);
  };
  var appOnUnlaunch = function () {
    // 打印事件信息
    infoEvent('app on unlaunch', arguments);


  };
  var appOnShow = function (options) {
    // 打印事件信息
    infoEvent('app on show', arguments);
    AppSite.launchOpts = AppSite.launchOpts || {};

    if (options && options.scene && AppSite.launchOpts.scene != options.scene) {
      
      AppSite.apply(AppSite.launchOpts, { "scene": options.scene});
    }

  };
  var appOnHide = function () {
    // 打印事件信息
    infoEvent('app on hide', arguments);


  };
  var appOnError = function () {
    // 打印事件信息
    infoEvent('app on error', arguments);


  };

  App = function (target) {
    succeedEvent(target, "onLaunch", appOnLaunch),
      succeedEvent(target, "onUnlaunch", appOnUnlaunch),
      succeedEvent(target, "onShow", appOnShow),
      succeedEvent(target, "onHide", appOnHide),
      succeedEvent(target, "onError", appOnError), app(target);
  };

  var pageOnLoad = function (options) {
    // 打印事件信息
    infoEvent('page on load', arguments);

  };
  var pageOnReady = function () {
    // 打印事件信息
    infoEvent('page on ready', arguments);
  };
  var pageOnShow = function () {
    // 打印事件信息
    infoEvent('page on show', arguments);
  };
  var pageOnHide = function () {
    // 打印事件信息
    infoEvent('page on hide', arguments);
  };
  var pageOnUnload = function () {
    // 打印事件信息
    infoEvent('page on unload', arguments);
  };
  var pageOnPullDownRefresh = function () {
    // 打印事件信息
    infoEvent('page on pull down refresh', arguments);
  };
  var pageOnReachBottom = function () {
    // 打印事件信息
    infoEvent('page on reach bottom', arguments);
  };
  var pageOnShareAppMessage = function () {
    // 打印事件信息
    infoEvent('page on share app message', arguments);
  };
  var pageOnPageScroll = function () {
    // 打印事件信息
    infoEvent('page on page scroll', arguments);
  };

  Page = function (target) {
    succeedEvent(target, "onLoad", pageOnLoad),
      "undefined" != typeof target.onReady && succeedEvent(target, "onReady", pageOnReady),
      "undefined" != typeof target.onShow && succeedEvent(target, "onShow", pageOnShow),
      "undefined" != typeof target.onHide && succeedEvent(target, "onHide", pageOnHide),
      "undefined" != typeof target.onUnload && succeedEvent(target, "onUnload", pageOnUnload),
      "undefined" != typeof target.onPullDownRefresh && succeedEvent(target, "onPullDownRefresh", pageOnPullDownRefresh),
      "undefined" != typeof target.onReachBottom && succeedEvent(target, "onReachBottom", pageOnReachBottom),
      "undefined" != typeof target.onShareAppMessage && succeedEvent(target, "onShareAppMessage", pageOnShareAppMessage),
      "undefined" != typeof target.onPageScroll && succeedEvent(target, "onPageScroll", pageOnPageScroll), page(target);
  };
})(this);

let Stat = AppSite.Stat;

export { Stat };
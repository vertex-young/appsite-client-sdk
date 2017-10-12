/**
 * appsite.js
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
let constants = require('./constants');
let qcloud = require('../../wafer2-client-sdk/index');

(function () {
  var objectPrototype = Object.prototype,
    toString = objectPrototype.toString,
    emptyFn = function () { }, i;

  var AppSite = global.AppSite;

  if (typeof AppSite === 'undefined') {
    AppSite = global.AppSite = {};
  }

  AppSite.ticks = AppSite.now = Date.now || (Date.now = function () {
    return +new Date();
  });

  AppSite._startTime = AppSite.ticks();

  /**
	 * AppSite.apply
	 */
  AppSite.apply = function (object, config, defaults) {
    if (defaults) {
      AppSite.apply(object, defaults);
    }
    if (object && config && typeof config === 'object') {
      var i, j, k;
      for (i in config) {
        object[i] = config[i];
      }
    }
    return object;
  };

  AppSite.apply(AppSite, {
    emptyFn: emptyFn,
    applyIf: function (object, config) {
      var property;
      if (object) {
        for (property in config) {
          if (object[property] === undefined) {
            object[property] = config[property];
          }
        }
      }
      return object;
    },
    clone: function (item) {
      if (item === null || item === undefined) {
        return item;
      }

      // DOM nodes
      if (item.nodeType && item.cloneNode) {
        return item.cloneNode(true);
      }

      // Strings
      var type = toString.call(item);

      // Dates
      if (type === '[object Date]') {
        return new Date(item.getTime());
      }

      var i, j, k, clone, key;
      // Arrays
      if (type === '[object Array]') {
        i = item.length;
        clone = [];
        while (i--) {
          clone[i] = AppSite.clone(item[i]);
        }
      }
      // Objects
      else if (type === '[object Object]' && item.constructor === Object) {
        clone = {};
        for (key in item) {
          clone[key] = AppSite.clone(item[key]);
        }
      }

      return clone || item;
    },
    merge: function (source) {
      var i = 1,
        ln = arguments.length,
        mergeFn = AppSite.merge,
        cloneFn = AppSite.clone,
        object, key, value, sourceKey;

      for (; i < ln; i++) {
        object = arguments[i];

        for (key in object) {
          value = object[key];
          if (value && value.constructor === Object) {
            sourceKey = source[key];
            if (sourceKey && sourceKey.constructor === Object) {
              mergeFn(sourceKey, value);
            }
            else {
              source[key] = cloneFn(value);
            }
          }
          else {
            source[key] = value;
          }
        }
      }
      return source;
    },
    mergeIf: function (source) {
      var i = 1,
        ln = arguments.length,
        cloneFn = AppSite.clone,
        object, key, value;
      for (; i < ln; i++) {
        object = arguments[i];
        for (key in object) {
          if (!(key in source)) {
            value = object[key];
            if (value && value.constructor === Object) {
              source[key] = cloneFn(value);
            }
            else {
              source[key] = value;
            }
          }
        }
      }
      return source;
    }
  });

  AppSite.apply(AppSite, {
    valueFrom: function (value, defaultValue, allowBlank) {
      return AppSite.isEmpty(value, allowBlank) ? defaultValue : value;
    },
    isEmpty: function (value, allowEmptyString) {
      return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (AppSite.isArray(value) && value.length === 0) || (AppSite.isSimpleObject(value) && JSON.stringify(value) === '{}');
    },
    isArray: ('isArray' in Array) ? Array.isArray : function (value) {
      return toString.call(value) === '[object Array]';
    },
    isDate: function (value) {
      return toString.call(value) === '[object Date]';
    },
    isMSDate: function (value) {
      if (!AppSite.isString(value)) {
        return false;
      } else {
        return value.match("\\\\?/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\\\?/") !== null;
      }
    },
    isObject: (toString.call(null) === '[object Object]') ? function (value) {
      // check ownerDocument here as well to exclude DOM nodes
      return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
    } :
      function (value) {
        return toString.call(value) === '[object Object]';
      },
    isSimpleObject: function (value) {
      return value instanceof Object && value.constructor === Object;
    },
    isPrimitive: function (value) {
      var type = typeof value;
      return type === 'string' || type === 'number' || type === 'boolean';
    },
    isFunction: function (value) {
      return typeof value === 'function';
    },
    isIterable: function (value) {
      return (value && typeof value !== 'string') ? value.length !== undefined : false;
    },
    isNumber: function (value) {
      return typeof value === 'number' && isFinite(value);
    },
    isNumeric: function (value) {
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    isString: function (value) {
      return typeof value === 'string';
    },
    isBoolean: function (value) {
      return typeof value === 'boolean';
    },
    isDefined: function (value) {
      return typeof value !== 'undefined';
    }
  });

  // 定义日志记录
  var logger = {
    log: function (message, priority) {
      if ('logger' in global) {
        if (!priority || !(priority in global.logger)) {
          priority = 'log';
        }
        message = '[' + priority.toUpperCase() + '] ' + message;
        global.logger[priority](message);
      }
    },
    info: function (message) {
      this.log(message, 'info');
    },
    warn: function (message) {
      this.log(message, 'warn');
    },
    error: function (message) {
      throw log(message, 'error');
    },
    debug: function (message) {
      this.log(message, 'debug');
    }
  };

  AppSite.apply(AppSite, {
    Logger: logger
  });

  AppSite.apply(AppSite, {
    Init: function (app, config, logger, launchOpts) {
      if (logger && typeof logger === 'object') {
        if (logger['log'] && logger['info'] && logger['warn'] && logger['error'] && logger['debug']) {
          global.logger = logger;
        }
      }

      if (!app) {
        throw new Error('注册App[' + app + ']异常');
      }
      if (!global.app) {
        global.app = app;
      }

      var thatConfig = this.config || {};
      this.applyIf(thatConfig, config || {});

      this.config = thatConfig;

      this.debug = thatConfig.env !== 'production';

      this.launchOpts = this.launchOpts || {};
      this.applyIf(this.launchOpts, launchOpts || {});

      // 设置腾讯云用户登录接口地址
      if (thatConfig && thatConfig.service && this.isString(thatConfig.service.loginUrl)) {
        qcloud.setLoginUrl(thatConfig.service.loginUrl);
      }
    }
  });
})();

// singleton class
var AppSite = global['AppSite'];
var Logger = AppSite.Logger;

// 设置常量
AppSite.apply(AppSite, constants);

export {
  AppSite as AppSite,
  Logger as Logger,

  qcloud as qcloud
}
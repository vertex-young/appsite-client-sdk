/**
 * utils.js
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

import { Logger, AppSite } from './appsite';
/**
 * 拓展对象
 */

var extend = function extend(target) {
  var sources = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < sources.length; i += 1) {
    var source = sources[i];
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// 测试微信函数是否存在，不存在则提醒版本低
var compatibleTest = (wxFunction, noticeDone, scope) => {
  if (wxFunction && (typeof wxFunction) === 'function') {
    return true;
  } else {
    wx.showModal({
      title: '提示',
      content: LOWVER,
      showCancel: false,
      complete: (res) => {
        if (noticeDone) {
          noticeDone.call(scope, res);
        }
      }
    })
  }
  return false
}

var toArray = function (iterable, start, end) {
  if (!iterable || !iterable.length) {
    return [];
  }
  if (typeof iterable === 'string') {
    iterable = iterable.split('');
  }
  var array = [],i;
  start = start || 0;
  end = end ? ((end < 0) ? iterable.length + end : end) : iterable.length;
  for (i = start; i < end; i++) {
    array.push(iterable[i]);
  }
  return array;
};

var format = function(format) {
  const formatRe = /\{(\d+)\}/g;
  var args = toArray(arguments, 1);
  return format.replace(formatRe, function (m, i) {
    return args[i];
  });
};

var toQueryObjects = function(name, value, recursive) {  
  var self = toQueryObjects,
    objects = [],
    i, ln;

  if (AppSite.isArray(value)) {
    var values=[];
    for (i = 0, ln = value.length; i < ln; i++) {
        values.push(value[i]);
    }
    objects.push({
      name: name,
      value: values.join(',')
    });
  }
  else if (AppSite.isObject(value)) {
    for (i in value) {
      if (value.hasOwnProperty(i)) {
        if (recursive) {
          objects = objects.concat(self(name + '[' + i + ']', value[i], true));
        }
        else {
          objects.push({
            name: name,
            value: value[i]
          });
        }
      }
    }
  }
  else {
    objects.push({
      name: name,
      value: value
    });
  }
  return objects;
};

var toQueryString = function(object, recursive) {
  var paramObjects = [],
    params = [],
    i, j, ln, paramObject, value;

  for (i in object) {
    if (object.hasOwnProperty(i)) {
      paramObjects = paramObjects.concat(toQueryObjects(i, object[i], recursive));
    }
  }

  for (j = 0, ln = paramObjects.length; j < ln; j++) {
    paramObject = paramObjects[j];
    value = paramObject.value;

    if (AppSite.isEmpty(value)) {
      value = '';
    }
    else if (AppSite.isDate(value)) {
      value = AppSite.Date.toString(value);
    }
    params.push(encodeURIComponent(paramObject.name) + '=' + encodeURIComponent(String(value)));
  }

  return params.join('&');
};

var trim = String.trim ? String.trim : function(string) {
  const trimRegex = /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g;

  return string.replace(trimRegex, "");
};

var urlAppend = function(url, string) {
  if (!AppSite.isEmpty(string)) {
    return url + (url.indexOf('?') === -1 ? '?' : '&') + string;
  }

  return url;
};

var leftPad = function(string, size, character) {
  var result = String(string);
  character = character || " ";
  while (result.length < size) {
    result = character + result;
  }
  return result;
};

var isEmpty = AppSite.isEmpty;
var isArray = AppSite.isArray;
var isDate = AppSite.isDate;
var isMSDate = AppSite.isMSDate;
var isObject = AppSite.isObject;
var isSimpleObject = AppSite.isSimpleObject;
var isPrimitive = AppSite.isPrimitive;
var isFunction = AppSite.isFunction;
var isIterable = AppSite.isIterable;
var isNumber = AppSite.isNumber;
var isNumeric = AppSite.isNumeric;
var isString = AppSite.isString;
var isBoolean = AppSite.isBoolean;
var isDefined = AppSite.isDefined;

var logger = global['logger'] || Logger;

export {
  //////////[tools]//////////
  logger,

  /////////[function]////////
  trim,
  extend,
  format,
  toArray,
  urlAppend,
  toQueryString,
  compatibleTest,

  ///////from appsite////////
  isEmpty,
  isArray,
  isDate,
  isMSDate,
  isObject,
  isSimpleObject,
  isPrimitive,
  isFunction,
  isIterable,
  isNumber,
  isNumeric,
  isString,
  isBoolean,
  isDefined
}
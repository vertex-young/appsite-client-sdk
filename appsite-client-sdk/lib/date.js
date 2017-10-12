/**
 * date.js
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
import { AppSite } from './appsite';

(function () {
  var DateExtras = AppSite.DateExtras;
  if (typeof DateExtras === 'undefined') {
    DateExtras = AppSite.DateExtras = {};
  }

  function xf(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/\{(\d+)\}/g, function (m, i) {
      return args[i];
    });
  }

  var utilDate = DateExtras;

  AppSite.apply(DateExtras, {
    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    MILLI: "ms",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    SECOND: "s",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    MINUTE: "mi",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    HOUR: "h",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    DAY: "d",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    MONTH: "mo",

    /**
     * Date interval constant.
     * @type String
     * @readonly
     */
    YEAR: "y",

    now: Date.now || function () {
      return +new Date();
    },
    getElapsed: function (dateA, dateB) {
      return Math.abs(dateA - (dateB || new Date()));
    },
    isLeapYear: function (date) {
      var year = date.getFullYear();
      return !!((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
    },
    getFirstDayOfMonth: function (date) {
      var day = (date.getDay() - (date.getDate() - 1)) % 7;
      return (day < 0) ? (day + 7) : Math.abs(day);
    },
    getLastDayOfMonth: function (date) {
      return utilDate.getLastDateOfMonth(date).getDay();
    },
    getFirstDateOfMonth: function (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    },
    getLastDateOfMonth: function (date) {
      return new Date(date.getFullYear(), date.getMonth(), utilDate.getDaysInMonth(date));
    },
    getDaysInMonth: (function () {
      var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      return function (date) { // return a closure for efficiency
        var m = date.getMonth();
        return m == 1 && utilDate.isLeapYear(date) ? 29 : daysInMonth[m];
      };
    })(),
    getSuffix: function (date) {
      switch (date.getDate()) {
        case 1:
        case 21:
        case 31:
          return "st";
        case 2:
        case 22:
          return "nd";
        case 3:
        case 23:
          return "rd";
        default:
          return "th";
      }
    },
    clone: function (date) {
      return new Date(date.getTime());
    },
    isDST: function (date) {
      // adapted from http://sencha.com/forum/showthread.php?p=247172#post247172
      // courtesy of @geoffrey.mcgill
      return new Date(date.getFullYear(), 0, 1).getTimezoneOffset() != date.getTimezoneOffset();
    },
    between: function (date, start, end) {
      var t = date.getTime();
      return start.getTime() <= t && t <= end.getTime();
    },
    add: function (date, interval, value) {
      var d = utilDate.clone(date);
      if (!interval || value === 0) return d;

      switch (interval.toLowerCase()) {
        case utilDate.MILLI:
          d = new Date(d.valueOf() + value);
          break;
        case utilDate.SECOND:
          d = new Date(d.valueOf() + value * 1000);
          break;
        case utilDate.MINUTE:
          d = new Date(d.valueOf() + value * 60000);
          break;
        case utilDate.HOUR:
          d = new Date(d.valueOf() + value * 3600000);
          break;
        case utilDate.DAY:
          d = new Date(d.valueOf() + value * 86400000);
          break;
        case utilDate.MONTH:
          var day = date.getDate();
          if (day > 28) {
            day = Math.min(day, utilDate.getLastDateOfMonth(utilDate.add(utilDate.getFirstDateOfMonth(date), 'mo', value)).getDate());
          }
          d.setDate(day);
          d.setMonth(date.getMonth() + value);
          break;
        case utilDate.YEAR:
          d.setFullYear(date.getFullYear() + value);
          break;
      }
      return d;
    },
    diff: function (min, max, unit) {
      var est, diff = +max - min;
      switch (unit) {
        case utilDate.MILLI:
          return diff;
        case utilDate.SECOND:
          return Math.floor(diff / 1000);
        case utilDate.MINUTE:
          return Math.floor(diff / 60000);
        case utilDate.HOUR:
          return Math.floor(diff / 3600000);
        case utilDate.DAY:
          return Math.floor(diff / 86400000);
        case 'w':
          return Math.floor(diff / 604800000);
        case utilDate.MONTH:
          est = (max.getFullYear() * 12 + max.getMonth()) - (min.getFullYear() * 12 + min.getMonth());
          if (utilDate.add(min, unit, est) > max) {
            return est - 1;
          } else {
            return est;
          }
        case utilDate.YEAR:
          est = max.getFullYear() - min.getFullYear();
          if (Ext.Date.add(min, unit, est) > max) {
            return est - 1;
          } else {
            return est;
          }
      }
    },
  });
})();

let DateExtras = AppSite.DateExtras;

AppSite.apply(AppSite, { Date: DateExtras });

export { DateExtras };
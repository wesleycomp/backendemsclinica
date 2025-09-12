"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class utils {
  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date) {
    return [date.getFullYear(), this.padTo2Digits(date.getMonth() + 1), this.padTo2Digits(date.getDate())].join('-');
  }
  formatDateHour(date) {
    return [date.getFullYear(), this.padTo2Digits(date.getMonth() + 1), this.padTo2Digits(date.getDate())].join('-') + ' ' + [this.padTo2Digits(date.getHours()), this.padTo2Digits(date.getMinutes()), this.padTo2Digits(date.getSeconds())].join(':');
  }
}
var _default = exports.default = utils;
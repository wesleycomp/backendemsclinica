"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = /** @class */ (function () {
    function utils() {
    }
    utils.prototype.padTo2Digits = function (num) {
        return num.toString().padStart(2, '0');
    };
    utils.prototype.formatDate = function (date) {
        return ([
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate()),
        ].join('-'));
    };
    utils.prototype.formatDateHour = function (date) {
        return ([
            date.getFullYear(),
            this.padTo2Digits(date.getMonth() + 1),
            this.padTo2Digits(date.getDate()),
        ].join('-') +
            ' ' +
            [
                this.padTo2Digits(date.getHours()),
                this.padTo2Digits(date.getMinutes()),
                this.padTo2Digits(date.getSeconds()),
            ].join(':'));
    };
    return utils;
}());
exports.default = utils;

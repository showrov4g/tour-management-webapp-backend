"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPPER_ADMIN"] = "SUPPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["GUIDE"] = "GUIDE";
})(Role || (exports.Role = Role = {}));
var isActive;
(function (isActive) {
    isActive["ACTIVE"] = "ACTIVE";
    isActive["INACTIVE"] = "INACTIVE";
    isActive["BLOCKED"] = "BLOCKED";
})(isActive || (exports.isActive = isActive = {}));

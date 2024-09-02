"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
exports.get = get;
exports.post = post;
exports.controller = controller;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'get', target, key);
    };
}
function post(path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
        Reflect.defineMetadata('method', 'post', target, key);
    };
}
function controller(target) {
    for (let key in target.prototype) {
        const path = Reflect.defineMetadata('path', target.prototype, key);
        const method = Reflect.getMetadata('method', target.prototype, key);
        const handler = target.prototype[key];
        if (path && method && handler) {
            exports.router[method](path, handler);
        }
    }
}

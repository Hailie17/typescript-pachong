"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = exports.put = exports.post = exports.get = exports.router = void 0;
exports.controller = controller;
exports.use = use;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
})(Method || (Method = {}));
// export function get(path:string){
//   return function(target: any, key: string){
//     Reflect.defineMetadata('path',path,target,key)
//     Reflect.defineMetadata('method','get',target,key)
//   }
// }
// export function post(path:string){
//   return function(target: any, key: string){
//     Reflect.defineMetadata('path',path,target,key)
//     Reflect.defineMetadata('method','post',target,key)
//   }
// }
function controller(target) {
    for (let key in target.prototype) {
        const path = Reflect.defineMetadata('path', target.prototype, key);
        const method = Reflect.getMetadata('method', target.prototype, key);
        const handler = target.prototype[key];
        const middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            if (middleware) {
                exports.router[method](path, middleware, handler);
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
}
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key);
    };
}
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
exports.put = getRequestDecorator('put');
exports.del = getRequestDecorator('delete');

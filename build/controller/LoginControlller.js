"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const decorator_1 = require("./decorator");
const utils_1 = require("../utils/utils");
let LoginController = class LoginController {
    login(req, res) {
        if (req.body.password === '123' && req.session) {
            req.session.login = true;
            res.json((0, utils_1.getResponseData)(true));
        }
        else {
            res.json((0, utils_1.getResponseData)(null, '登录失败'));
        }
    }
    logout(req, res) {
        if (req.session) {
            req.session.login = undefined;
        }
        res.json((0, utils_1.getResponseData)(true));
    }
    home(req, res) {
        const isLogin = req.session ? req.session.login : false;
        if (isLogin) {
            res.send(`
    <html>
      <body>
        <a href="/getData">爬取网页</a>
        <a href="/showData">展示内容</a>
        <a href="/logout">退出</a>
      </body>
    </html>
    `);
        }
        else {
            res.send(`
      <html>
        <body>
          <form method='post' action='/login'>
            <input type="password" name="password"/>
            <button type="submit">提交</button>
          </form>
        </body>
      </html>
      `);
        }
    }
};
__decorate([
    (0, decorator_1.post)('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "login", null);
__decorate([
    (0, decorator_1.get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "logout", null);
__decorate([
    (0, decorator_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "home", null);
LoginController = __decorate([
    decorator_1.controller
], LoginController);

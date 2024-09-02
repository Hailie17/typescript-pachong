"use strict";
// 普通方法，target 对应的是类的prototype
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// 静态方法：target 对应的是类的构造函数
function nameDecorator(target, key) {
    console.log(target, key);
}
// lll
class Test1 {
    constructor() {
        this.name = 'dell';
    }
}
__decorate([
    nameDecorator,
    __metadata("design:type", Object)
], Test1.prototype, "name", void 0);
const test = new Test1();
console.log(test.name);

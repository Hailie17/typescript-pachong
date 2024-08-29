// 普通方法，target 对应的是类的prototype

import { text } from "body-parser";

// 静态方法：target 对应的是类的构造函数
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target, key);
  
}

class Test1 {
  private _name: string;
  constructor(name: string) {
    this._name = name
  }
  get name(){
    return this._name
  }
  @visitDecorator
  set name(name: string) {
    this._name = name
  }
}

const test = new Test1('dell')
test.name = 'sss'
console.log(test.name);

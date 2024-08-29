// 普通方法，target 对应的是类的prototype

import { text } from "body-parser";

// 静态方法：target 对应的是类的构造函数
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target, key);
  
}

class Test1 {
  name = 'dell'
}

const test = new Test1()
console.log(test.name);

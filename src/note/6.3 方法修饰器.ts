// 普通方法，target 对应的是类的prototype
// 静态方法：target 对应的是类的构造函数
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target, key);
  
}

class Test {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  @getNameDecorator
  static getName(){
    return '233'
  }
}
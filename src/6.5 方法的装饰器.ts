// 普通方法，target 对应的是类的prototype


// 静态方法：target 对应的是类的构造函数
function nameDecorator(target: any, key: string) {
  console.log(target, key);
  
}
// 111
class Test1 {
  @nameDecorator
  name = 'dell'
}

const test = new Test1()
console.log(test.name);

class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  constructor () {
    console.log('hello');
    
  }
}

const crowller = new Crowller()
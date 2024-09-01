import { Request, Response } from "express";
import 'reflect-metadata'

function get(path:string){
  return function(target: any, key: string){
    Reflect.defineMetadata('path',path,target,key)
  }
}

class LoginController {
  @get('/')
  home(req: Request, res: Response){
    const isLogin = req.session ? req.session.login : false
  if(isLogin) {
    res.send(`
    <html>
      <body>
        <a href="/getData">爬取网页</a>
        <a href="/showData">展示内容</a>
        <a href="/logout">退出</a>
      </body>
    </html>
    `)
  } else {
    res.send(`
      <html>
        <body>
          <form method='post' action='/login'>
            <input type="password" name="password"/>
            <button type="submit">提交</button>
          </form>
        </body>
      </html>
      `)
  }
  }
}
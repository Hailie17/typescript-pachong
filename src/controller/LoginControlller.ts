import { Request, Response } from "express";
import 'reflect-metadata'
import { get, controller } from "./decorator";
import {getResponseData} from '../utils/utils'

@controller
class LoginController {
  @get('/login')
  login(req: Request, res: Response){
    res.send('login is running')
  }
  @get('/logout')
  logout(req: Request, res: Response){
    if(req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
  }
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
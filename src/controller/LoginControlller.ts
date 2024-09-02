import { Request, Response } from "express";
import 'reflect-metadata'
import { get, post, controller } from "./decorator";
import {getResponseData} from '../utils/utils'

interface IRequest extends Request {
  body: {
    [key: string]: string
  }
}
@controller
class LoginController {
  @post('/login')
  login(req: IRequest, res: Response){
     if(req.body.password === '123' && req.session) {
      req.session.login = true
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(null, '登录失败'))
    }
  }
  @get('/logout')
  logout(req: IRequest, res: Response){
    if(req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
  }
  @get('/')
  home(req: IRequest, res: Response){
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
import { Router, Request, Response } from "express";
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router = Router()

interface IRequest extends Request {
  body: {
    [key: string]: string
  }
}

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method='post' action='/getData'>
          <input type="password" name="password"/>
          <button type="submit">提交</button>
        </form>
      </body>
    </html>
    `)
})

router.post('/getData', (req: IRequest, res: Response) => {
  // const secret = 'secretKey'
  // const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  // const analyze = DellAnalyzer.getInstance()
  // new Crowller(url, analyze)
  const isLogin = req.session ? req.session.login : false
  if(isLogin) {
    res.send('已经登录')
  } else {
    if(req.body.password === '123'){
      if(req.session) {
        req.session.login = true
        res.send('登陆成功')
      }
    } else {
      res.send('password error')
    }
  } 
})

export default router
import { NextFunction, Request, Response } from "express";
import 'reflect-metadata'
import path from 'path'
import fs from 'fs'
import {controller,use, get, post} from "../decorator";
import Crowller from '../crowller'
import DellAnalyzer from '../dellAnalyzer'
import { getResponseData } from "../utils/utils";

interface IRequest extends Request {
  body: {
    [key: string]: string
  }
}
// 中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session ? req.session.login : false
  if(isLogin) {
    next()
  }
  res.json(getResponseData(null, '请先登录'))
}
// 中间件
const test = (req: Request, res: Response, next: NextFunction) => {
  console.log('test middleware');
  next()
}

@controller
class LoginController {
  // 获取数据
  @get('/getData')
  @use(checkLogin)
  getData(req: IRequest, res: Response){
    const secret = 'secretKey'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    const analyze = DellAnalyzer.getInstance()
    new Crowller(url, analyze)
    res.send('爬取成功')
  }

  // 展示数据
  @get('/showData')
  @use(checkLogin)
  showData(req: IRequest, res: Response){
    try {
      const position = path.resolve(__dirname, '../data/course.json')
      const result = fs.readFileSync(position, 'utf-8')
      res.json(JSON.parse(JSON.parse(result)))
    } catch (error) {
      res.send('尚未爬取到数据')
    }
  }
}
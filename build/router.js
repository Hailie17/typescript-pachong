"use strict";
// import { Router, Request, Response, NextFunction } from "express";
// import Crowller from './crowller'
// import DellAnalyzer from './dellAnalyzer'
// import path from 'path'
// import fs from 'fs'
// import {getResponseData} from './utils/utils'
// const router = Router()
// interface IRequest extends Request {
//   body: {
//     [key: string]: string
//   }
// }
// const checkLogin = (req: Request, res: Response, next: NextFunction) => {
//   const isLogin = req.session ? req.session.login : false
//   if(isLogin) {
//     next()
//   }
//   res.json(getResponseData(null, '请先登录'))
// }
// router.get('/', () => {})
// router.get('/logout', (req: Request, res: Response) => {
//   if(req.session) {
//     req.session.login = undefined
//   }
//   res.json(getResponseData(true))
// })
// router.post('/login',checkLogin, (req: Request, res: Response) => {
//   if(req.body.password === '123' && req.session) {
//     req.session.login = true
//     res.json(getResponseData(true))
//   } else {
//     res.json(getResponseData(null, '登录失败'))
//   }
// })
// router.get('/getData', checkLogin,(req: IRequest, res: Response) => {
//     const secret = 'secretKey'
//     const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
//     const analyze = DellAnalyzer.getInstance()
//     new Crowller(url, analyze)
//     res.send('爬取成功')
// })
// router.get('/showData',checkLogin, (req: IRequest, res: Response) => {
//   try {
//     const position = path.resolve(__dirname, '../data/course.json')
//     const result = fs.readFileSync(position, 'utf-8')
//     res.json(JSON.parse(JSON.parse(result)))
//   } catch (error) {
//     res.send('尚未爬取到数据')
//   }
// })
// export default router

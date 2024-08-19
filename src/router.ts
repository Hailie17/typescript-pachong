import { Router, Request, Response } from "express";
import Crowller from './crowller'
import DellAnalyzer from './dellAnalyzer'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

router.get('/getData', (req: Request, res: Response) => {
  const secret = 'secretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
  const analyze = DellAnalyzer.getInstance()
  new Crowller(url, analyze)
  res.send('ok')
})

export default router
/**
 * 存文件内容
 */

import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import DellAnalyzer from './dellAnalyzer'

export interface Analyze {
  analyze: (html: string, filePath: string) => string
}
class Crowller {

  private filePath = path.resolve(__dirname,'../data/course.json')
  
  // 拿到原始html
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }
  
  // 爬取
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    const fileContent = this.analyze.analyze(html, this.filePath)
    // 写入文件
    fs.writeFileSync(this.filePath,JSON.stringify(fileContent))
  }
  constructor (private url: string, private analyze: Analyze) {
    this.initSpiderProcess()
  }
}

  const secret = 'secretKey'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`

const analyze = new DellAnalyzer()
new Crowller(url, analyze)
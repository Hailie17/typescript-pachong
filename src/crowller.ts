import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import * as cheerio from 'cheerio';
import { data } from 'cheerio/dist/commonjs/api/attributes';

interface Course {
  title: string,
  count: number
}
interface CourseResult {
  time: number,
  data: Course[]
}
interface Content {
  [propName: number]: Course[]
}
class Crowller {
  private secret = 'secretKey'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  // 拿到课程信息
  getCourseInfo(html: string){
    const $ = cheerio.load(html)
    const courseItems = $('.course-item')
    const courseInfos:Course[] = []
    courseItems.map((index,element)=> {
      const descs = $(element).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1],10)
      courseInfos.push({title,count})
    })
    const result = {
      time: new Date().getTime(),
      data: courseInfos
    }   
    return result 
  }
  // 拿到原始html
  async getRawHtml() {
    const result = await superagent.get(this.url)
    return result.text
  }
  // 生成json
  generateJsonContent(courseInfo: CourseResult) {
    const filePath = path.resolve(__dirname,'../data/course.json')
    let fileContent:Content = {}
    if(fs.existsSync(filePath)){
      fileContent = JSON.parse(fs.readFileSync(filePath,'utf-8'))
    }
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }
  // 爬取
  async initSpiderProcess() {
    const filePath = path.resolve(__dirname,'../data/course.json')
    const html = await this.getRawHtml()
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo)
    // 写入文件
    fs.writeFileSync(filePath,JSON.stringify(fileContent))
  }
  constructor () {
    this.initSpiderProcess()
  }
}

const crowller = new Crowller()
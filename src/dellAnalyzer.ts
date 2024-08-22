/**
 * 分析页面拿到的内容
 */
import * as cheerio from 'cheerio';
import { data } from 'cheerio/dist/commonjs/api/attributes';
import fs from 'fs'
import { Analyze } from './crowller';
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
export default class DellAnalyzer implements Analyze {
  private static instance: DellAnalyzer
  static getInstance() {
    if(!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }
  // 拿到课程信息
  private getCourseInfo(html: string){
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
  // 生成json
  private generateJsonContent(courseInfo: CourseResult,filePath:string) {
    let fileContent:Content = {}
    if(fs.existsSync(filePath)){
      fileContent = JSON.parse(JSON.parse(fs.readFileSync(filePath,'utf-8')))
    }
    console.log(fileContent,222);
    
    fileContent[courseInfo.time] = courseInfo.data
    return fileContent
  }
// 11
  public analyze(html:string, filePath:string) {
    const courseInfo = this.getCourseInfo(html)
    const fileContent = this.generateJsonContent(courseInfo,filePath)
    return JSON.stringify(fileContent)
  }
  private constructor() {}
}
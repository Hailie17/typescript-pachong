"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 分析页面拿到的内容
 */
const cheerio = __importStar(require("cheerio"));
const fs_1 = __importDefault(require("fs"));
class DellAnalyzer {
    static getInstance() {
        if (!DellAnalyzer.instance) {
            DellAnalyzer.instance = new DellAnalyzer();
        }
        return DellAnalyzer.instance;
    }
    // 拿到课程信息
    getCourseInfo(html) {
        const $ = cheerio.load(html);
        const courseItems = $('.course-item');
        const courseInfos = [];
        courseItems.map((index, element) => {
            const descs = $(element).find('.course-desc');
            const title = descs.eq(0).text();
            const count = parseInt(descs.eq(1).text().split('：')[1], 10);
            courseInfos.push({ title, count });
        });
        const result = {
            time: new Date().getTime(),
            data: courseInfos
        };
        return result;
    }
    // 生成json
    generateJsonContent(courseInfo, filePath) {
        let fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8')));
        }
        console.log(fileContent, 222);
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    }
    // 11
    analyze(html, filePath) {
        const courseInfo = this.getCourseInfo(html);
        const fileContent = this.generateJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    }
    constructor() { }
}
exports.default = DellAnalyzer;

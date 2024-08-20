"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crowller_1 = __importDefault(require("./crowller"));
const dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send(`
    <html>
      <body>
        <form method='post' action='/getData'>
          <input type="password" name="password"/>
          <button type="submit">提交</button>
        </form>
      </body>
    </html>
    `);
});
router.post('/getData', (req, res) => {
    if (req.body.password === '123') {
        const secret = 'secretKey';
        const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
        const analyze = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyze);
        res.send('ok');
    }
    else {
        res.send('password error');
    }
});
exports.default = router;

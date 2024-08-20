"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
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
    // const secret = 'secretKey'
    // const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`
    // const analyze = DellAnalyzer.getInstance()
    // new Crowller(url, analyze)
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send('已经登录');
    }
    else {
        if (req.body.password === '123' && req.session) {
            req.session.login = true;
            res.send('登陆成功');
        }
        else {
            res.send('password error');
        }
    }
});
exports.default = router;

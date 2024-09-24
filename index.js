const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors')
const { bodyParser } = require('@koa/bodyparser');

const indexRouter = require('./router/index.js'); // 引入路由

app.use(cors()); // 允许跨域 告诉浏览器不要破坏我的响应
app.use(bodyParser());// 辅助koa解析post传递的参数


app.use(indexRouter.routes(), indexRouter.allowedMethods());

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

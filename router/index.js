const Router = require('koa-router');
const { getCategories, getDetailsByCategoryId} = require('../controllers/index.js');
const { generateImage } = require('../services/openaiService');


const router = new Router();
router.prefix('/api'); // 路由前缀

// 获取所有分类
router.get('/categories', async (ctx) => {
    try {
        const categories = await getCategories();
        ctx.body = {
            code: '8000',
            msg: '获取分类成功',
            data: categories
        };
    } catch (error) {
        ctx.body = {
            code: '8001',
            msg: '获取分类失败',
            data: error
        };
    }
});

// 根据分类 ID 获取详细信息
router.get('/details/:categoryId', async (ctx) => {
    const categoryId = ctx.params.categoryId;
    try {
        const details = await getDetailsByCategoryId(categoryId);
        ctx.body = {
            code: '8000',
            msg: '获取详细信息成功',
            data: details
        };
    } catch (error) {
        ctx.body = {
            code: '8001',
            msg: '获取详细信息失败',
            data: error
        };
    }
});

// 生成图片
router.post('/generate-image', async (ctx) => {
  const { inputText } = ctx.request.body;
  const prompt = `
    你是一位举世闻名的美术设计师，精通各种画术，请你根据内容描述细节为：${inputText}，生成一张高质量且精确的图片，
  `;

  try {
    const imageUrl = await generateImage(prompt);
    ctx.body = {
      code: 200,
      url: imageUrl
    };
  } catch (error) {
    ctx.body = {
      code: 500,
      msg: '出错了'
    };
  }
});

// 获取所有图片
// router.get('/images', async (ctx) => {
//   try {
//     const images = await imageService.getAllImages();
//     ctx.body = {
//       code: 200,
//       images
//     };
//   } catch (error) {
//     ctx.body = {
//       code: 500,
//       msg: '出错了'
//     };
//   }
// });


// 测试请求
// router.get('/', (ctx) => {
//   ctx.body = 'index page';
// });


module.exports = router;

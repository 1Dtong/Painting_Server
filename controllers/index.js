const mysql = require('mysql2/promise');
const config = require('../config/index.js');

// 创建线程池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT
});

// 封装一个函数用来连接数据库，执行 SQL 语句
const allServices = {
    async query(sql, values) {
        try {
            // 从线程池获取连接
            const conn = await pool.getConnection();
            // 执行 SQL 语句
            const [rows, fields] = await conn.query(sql, values);
            // 释放连接
            pool.releaseConnection(conn);
            // 返回结果
            return Promise.resolve(rows);
        } catch (error) {
            return Promise.reject(error); // 抛出错误
        }
    }
};

// 获取所有分类
const getCategories = () => {
    let _sql = `SELECT * FROM categories;`
    return allServices.query(_sql);
};

// 根据分类 ID 获取详细信息
const getDetailsByCategoryId = (categoryId) => {
    let _sql = `SELECT * FROM details WHERE category_id = ?;`
    return allServices.query(_sql, [categoryId]);
};

// 将生成的图片保存到数据库
// const saveGenerateImage = (imageUrl) => {
//     let _sql = `INSERT INTO images (image_url) VALUES (?);`
//     return allServices.query(_sql, [imageUrl]);
// };

// 获取所有图片
// const getAllImages = () => {
//     let _sql = `SELECT * FROM images;`
//     return allServices.query(_sql);
// };

// 导出模块
module.exports = {
    getCategories,
    getDetailsByCategoryId,
    // saveGenerateImage,
    // getAllImages
};

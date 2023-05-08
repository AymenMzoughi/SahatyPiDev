const { config } = require('dotenv');
config();
exports.PORT = Number.parseInt(`${process.env.PORT}`);
exports.DBNAME = `${process.env.DBNAME}`;
exports.__DEV__ = process.env.NODE_ENV != 'production';
exports.GOOGLE_CLIENT_ID = `${process.env.GOOGLE_CLIENT_ID}`;
exports.GOOGLE_CLIENT_SECRET = `${process.env.GOOGLE_CLIENT_SECRET}`;
exports.GITHUB_CLIENT_ID = `${process.env.GITHUB_CLIENT_ID}`;
exports.GITHUB_CLIENT_SECRET = `${process.env.GITHUB_CLIENT_SECRET}`;
exports.FACEBOOk_CLIENT_ID = `${process.env.FACEBOOk_CLIENT_ID}`;
exports.FACEBOOk_CLIENT_SECRET = `${process.env.FACEBOOk_CLIENT_SECRET}`;
exports.CLIENT_URL = 'http://localhost:3000/';
exports.OAPI_KEY = `${process.env.OPENAI_API_KEY}`;

// ログアウト済みトークンの保管コレクションの登録と初回登録
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cookie : String,
});

var wc = mongoose.model('wastes', schema);
wc.create({
  cookie: 'init'
});

module.exports = mongoose.model('wastes', schema);
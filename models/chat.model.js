// 会話コレクションのスキーマ設定
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    fromAddress : String,
    toAddress : String,
    message : String,
    timeStamp : String,
	image: String,
	stampTitle: String
});

module.exports = mongoose.model('chats', schema);
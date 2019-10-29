// ユーザーコレクションのスキーマ登録、初期ユーザーの登録
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);


const schema = new Schema({
    nickName:  { type: String, unique: true, required: true },
    passCode:  { type: String, required: true },
	userImage: { type: String }
});


// エコーさんを作成
var baseStr = "data:image/png;base64,";
var echoUserImage;
var fs = require('fs');
var User = mongoose.model('user', schema);

User.findOne({ "nickName": "Echo" }, (err, user) => {
  if (!user) {
  	var baseStr = "data:image/png;base64,";
    var echoUserImage;
    fs.readFile('public/files/2.jpg', function (err, data) {
      if (err) throw err;
        echoUserImage = baseStr.concat(new Buffer(data).toString('base64'));
        User.create({
          nickName: 'Echo',
          passCode: '$2a$10$MuOdmUu9.yO7Z22uuFr/Wup8hfmoUbOfJtVWRYK0NTPK9RKtt2D7u',
          userImage: echoUserImage
        });
    });
  }
});


module.exports = mongoose.model('users', schema);
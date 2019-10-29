var express = require('express');
var router = express.Router();
var db = require('../helper/db');
var User = db.User;
const verifyToken = require('../helper/VerifyToken');

//--------------------------------------------------------
// 友達リスト画面の出力
//--------------------------------------------------------
router.get('/',verifyToken, function(req, res, next) {
	var users = [];
	// ログインしたユーザーを除くすべての登録ユーザーをデータベースから取得し、ユーザー名とプロファイル画像のjsonオブジェクトを作成します
	User.find({ nickName: {$ne: req.name}}).stream().on('data', function(doc) {
	  var base64Data;
		
	  if(doc.userImage !== undefined){
		  
		base64Data = doc.userImage.replace(/^data:image\/png;base64,/, "")
		
	  }
		users.push({id : doc._id, nickName : doc.nickName, userImage: base64Data });
		
	 }).on('error', function(err){
		res.send(err);
	})
	.on('end', function(){
	
    res.render('list.ejs', {listUsers : users });

  });
        
});


module.exports = router;
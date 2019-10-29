var express = require('express');
var router = express.Router();
var db = require('../helper/db');
var User = db.User;
const verifyToken = require('../helper/VerifyToken');
var botEcho = require('../helper/bot.echo');

// ルートアクセス時にベースの画面を返す
// 友達の名前とそれぞれのIDをEJSでHTMLに埋め込む
router.get('/', verifyToken, (req, res) => {

	var id = req.query.id;
	// MongoDB Operator Injectionを防ぐために、ユーザー提供のデータをサニタイズします
	id = id.replace(/[$.]/g, "");
	
	FrID = id;
	FrName = req.query.nickName;
	
	botEcho.start();
	
	// friends
    console.log(id);
	User.findOne({'_id': id}).then(user => {
      if (user) {
			res.render('chatapp.ejs',
			    {frendName:user.nickName ,
			    myidf: MyID ,
			    fiidf: user._id ,
			    fimagef: user.userImage
			});         
		 }
	});
});




module.exports = router;
var express = require('express');
var router = express.Router();
var db = require('../helper/db');
var User = db.User;
var Chat = db.Chat;
const verifyToken = require('../helper/VerifyToken');
var { check, validationResult } = require('express-validator');
var fs = require('fs');
const chatsv = require('../models/chat.service');

// クライアントからgetされると会話全件をjsonで返す
router.get('/', verifyToken, (req, res) => {
   	var loggedInUserId = req.id;
	var friendId = req.query.f1ID;
	// ログインしているユーザーと選択した友人の会話を取得する
	Chat.aggregate([
	    { $match: { "fromAddress" : { $in : [loggedInUserId, friendId] }, 
	                "toAddress"   : { $in : [friendId, loggedInUserId] } 
	              } 
	    } ]).then((messages) => {
	    res.json(messages);
	}).catch((err) => {
        res.send(err);
	});
});


// 会話内容がポストされれば、それを登録する
router.post('/', verifyToken, [check('mess').escape()], (req, res) => {
	var postData = req.body;

	chatsv.create({
        fromAddress : MyID,
        toAddress : FrID,
        message : postData.mess,
	    image : postData.image,
	    stampTitle : postData.stampLabel
	});
    res.json(postData.mess);
});

// ディレクトリからスタンプを読み取り、json形式で返す
router.get('/stamps', verifyToken, (req, res) => {
	const stampDirPath = './public/files/stamps/';
	fs.readdir(stampDirPath, (err, files) => {
	res.json(files);
  });
});



module.exports = router;
var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');
var sanitize = require('mongo-sanitize');
var db = require('../helper/db');
var User = db.User;
var bcrypt = require('bcryptjs');


var jsonwebtoken  =  require('jsonwebtoken');
const config = require('../config');

//--------------------------------------------------------
// ログイン画面の表示
//--------------------------------------------------------
/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie("auth");
	res.render('login', {error: false, errors:false});
});


//--------------------------------------------------------
// ログイン処理
//--------------------------------------------------------
//ユーザ認証
router.post('/',[check('nickName', 'ニックネームを入力して下さい').not().isEmpty().trim().escape().customSanitizer(value => {
  // MongoDB Operator Injectionを防ぐために、ユーザー提供のデータをサニタイズします
  value = value.replace(/[$.]/g, "");
  return value;
}),
  check('passCode', 'パスコードを入力して下さい').not().isEmpty().trim().escape(),
], (req, res) => {
	
		var errors = validationResult(req);
		//検証エラー
		if (!errors.isEmpty()) {
			res.render('register.ejs',{data: req.body, errors: errors.mapped() });
		}
		
		const  nickName  =  sanitize(req.body.nickName);
		const  passcode  =  sanitize(req.body.passCode);
	
		User.findOne({nickName}, (err, user)=>{
        if (err) return  res.status(500).send(err);
		
        if (!user) return  res.render('login.ejs',  {error: 'ユーザーが見つかりません', errors:false});
		
		//パスコードチェック
        bcrypt.compare(passcode, user.passCode, function(err, result) {
			
        if(!result) return  res.render('login.ejs',  {error: 'パスコードが違います', errors:false});
        //JSON Webトークンを生成する,トークンの有効期限を15分に設定
		const  expiresIn  =  900;
        const  accessToken  =  jsonwebtoken.sign({id : user._id, name :  user.nickName }, config.secret, {
            expiresIn:  expiresIn
        });
		//トークンをクッキーに保存する
		res.cookie('auth',accessToken , { maxAge: 900000, httpOnly: true });
		MyID = user._id;
		MyName = user.nickName;

        res.redirect('/home');
    });
 });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var { check, validationResult } = require('express-validator');
var db = require('../helper/db');
var User = db.User;
const userService = require('../models/user.service');

//--------------------------------------------------------
// ログイン画面の表示
//--------------------------------------------------------
/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie("auth");
	res.render('register', {data: req.body, error: false, errors:false});
});

//--------------------------------------------------------
// ユーザー登録処理
//--------------------------------------------------------
router.post('/', [
  check('nickName', 'Nick name は英文字のみです').not().isEmpty().isAlpha().trim().escape(),
  check('passCode', 'Pass code は数字のみです').not().isEmpty().isAlphanumeric().trim().escape(),
  check('nickName', 'Nick name は4文字以上12文字までです.').not().isEmpty().isLength({min: 4, max: 12}).trim().escape(),
  check('passCode', 'Pass code は6文字以上12文字までです.').not().isEmpty().isLength({min: 6, max: 12}).trim().escape(),
  check('nickName').custom(value => {
	// MongoDB Operator Injectionを防ぐために、ユーザー提供のデータをサニタイズします
	value = value.replace(/[$.]/g, "");
	
	//ニックネームを検証する
    return User.findOne({'nickName': value}).then(user => {
      if (user) {
        return Promise.reject(user['nickName'] + 'さんは登録済みです.');
      }
    });
  })
], (req, res) => {
	
	  var errors = validationResult(req);
	//検証エラー
  if (!errors.isEmpty()) {
     res.render('register.ejs',{data: req.body, errors: errors.mapped() });
  }else{
		//エラーなし, データベースにユーザー情報を保存する	  
		userService.create(req.body);
     
		res.redirect('/');
		
  }
  
});


module.exports = router;

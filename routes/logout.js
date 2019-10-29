var express = require('express');
var router = express.Router();
var db = require('../helper/db');
var wc = db.Waste;

// ログアウトルーティング
router.get('/', function(req, res, next) {

    try{
        clearInterval(botTimer);
    } catch( e ) {
        // 何もしない
    }
    
    MyID='';
    MyName='';
    FrID='';
    FrName='';
    
	if(req.cookies.auth){
    	//ログアウト済みトークンを退避
        const wastec = new wc();
        wastec.cookie = req.cookies.auth;
        wastec.save();
	}
	//Cookiesからトークンをクリア
	res.clearCookie("auth");
	res.redirect('/');

});

module.exports = router;
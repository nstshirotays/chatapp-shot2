// Json Web Tokenのチェック処理
var jwt = require('jsonwebtoken');
const config = require('../config');
var db = require('../helper/db');
var Waste = db.Waste;


function verifyToken(req, res, next) {
    var token = req.cookies.auth;
    if (!token) {
        return res.status(403).render('errorpage.ejs', { error: '１５分間無操作のためログアウトしました', errors: false });
    }

    // 破棄済みトークンを検索
	Waste.findOne({'cookie': token}).then(data => {
        if (data) {
            return res.status(403).render('errorpage.ejs', { error: '不正なトークンです', errors: false });
		}
	});
	
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) {
            return res.status(500).render('errorpage.ejs', { error: 'Failed to authenticate token.', errors: false });
        } else {
            // すべてうまくいけば、他のルートで使用するために保存して次へ
            req.name = decoded.name;
            req.id = decoded.id;
            next();
        }
    });
}

module.exports = verifyToken;
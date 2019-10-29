var express = require('express');
var router = express.Router();

//エラーページをレンダリングします
router.get('/', function(req, res, next) {
    console.log(req.query.error);
    try{
        clearInterval(botTimer);
    } catch( e ) {
        // 何もしない
    }
    
    MyID='';
    MyName='';
    FrID='';
    FrName='';
    
    if(req.query.errorcode == 403){
        res.render('errorpage.ejs',  {error: 'Logged out because 15 minutes inactive.',errors: false});
    } else{
        res.render('errorpage.ejs',  {error: 'System error occurred.',errors: false});
    }
});

module.exports = router;
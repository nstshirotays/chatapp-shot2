// 会話コレクションへの登録操作
const db = require('../helper/db');
const Chat = db.Chat;

module.exports = {
     create
 };

function create(userParam) {
    
    const chat = new Chat();
    chat.fromAddress = userParam.fromAddress;
    chat.toAddress = userParam.toAddress;
    chat.message = userParam.message;
    chat.timeStamp = getDateTime();
	chat.image = userParam.image;
	chat.stampTitle = userParam.stampTitle;
	
    chat.save();

}



// 日時の整形処理
function getDateTime(){
    var date = new Date();

    var year_str = date.getFullYear();
    var month_str = date.getMonth();
    var day_str = date.getDate();
    var hour_str = date.getHours();
    var minute_str = date.getMinutes();
    var second_str = date.getSeconds();

    month_str = ('0' + month_str).slice(-2);
    day_str = ('0' + day_str).slice(-2);
    hour_str = ('0' + hour_str).slice(-2);
    minute_str = ('0' + minute_str).slice(-2);
    second_str = ('0' + second_str).slice(-2);

    format_str = 'YYYY/MM/DD hh:mm:ss';
    format_str = format_str.replace(/YYYY/g, year_str);
    format_str = format_str.replace(/MM/g, month_str);
    format_str = format_str.replace(/DD/g, day_str);
    format_str = format_str.replace(/hh/g, hour_str);
    format_str = format_str.replace(/mm/g, minute_str);
    format_str = format_str.replace(/ss/g, second_str);
    return format_str;

}

// Echoさんの処理
var db = require('../helper/db');
var Chat = db.Chat;
const chatsv = require('../models/chat.service');

exports.start = function(){
	//  最初の挨拶を登録
	if(FrName == 'Echo') {
		// echo
		chatsv.create({
            fromAddress : FrID,
            toAddress : MyID,
            message : 'こんにちは'
		});
        // 1秒ごとに新しいメッセージを検索する
		botTimer = setInterval(function(){
		    serachNewMessages();
		},1000);
	}
};


var resentMsg ="";
function serachNewMessages() {
	if(FrName == 'Echo') {
        // Echo さんの最後の発言を取得する
        var query = { "fromAddress": FrID ,"toAddress": MyID};
        
        Chat.find(query,{},{sort:{timeStamp: -1},limit:1}, function(err, data){
            if(err){
                console.log("serachNewMessages err",err);
            }
            if(data.length > 0){
                // Echoさん最後の発言以降の自分の発言を取得する.
                var lastMessageTime = data[0].timeStamp;
                query = { "fromAddress": MyID ,"toAddress": FrID,"timeStamp": {$gt : lastMessageTime}};
                Chat.find(query,{},{sort:{timeStamp: -1},limit:1}, function(err, data){
                    if(err){
                        console.log("serachNewMessages err",err);
                    }
                    if(data.length > 0){
                        var resMessage="";
                        // 応答メッセージの設定
                        if(data[0].message.length > 0){
                            resMessage = data[0].message + "ですね";
                        } else {
                            if (data[0].stampTitle === undefined){
                                if (data[0].image == ""){
                                    resMessage =  "無言ですか";
                                } else {
                                    resMessage =  "画像ですね";
                                }
                            } else {
                                resMessage = data[0].stampTitle + "ですね";
                            }
                        }
                        // 退避メッセージと異なってれば発話する
                        if ( resentMsg != data[0].timeStamp + data[0].message) {
                            resentMsg = data[0].timeStamp + data[0].message;
                    		chatsv.create({
                                fromAddress : FrID,
                                toAddress : MyID,
                                message : resMessage
                    		});
                        }
                        else {
                            // console.log("serachNewMessages Nofind");
                        }
                    }
                });
            }
        });
    }
}


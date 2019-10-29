// Mongooseの処理（DBのオープンとコレクションスキームの登録）
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb',{ useUnifiedTopology : true, useNewUrlParser: true });
mongoose.set('useCreateIndex',true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));


module.exports = {
    User: require('../models/user.model'),
    Chat: require('../models/chat.model'),
    Waste: require('../models/waste.model')
};
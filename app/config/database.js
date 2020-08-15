const mongoose = require('mongoose');
const CONFIG = require('./config');

module.exports = {
    connection: null,
    connect: function(){
        if(this.connection) return this.connection;
        return mongoose.connect(CONFIG.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(connection => {this.connection = connection;
            console.log('DB conecction successful');
        }).catch(error => console.log(error));
    }
}
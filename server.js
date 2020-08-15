const Database = require('./app/config/database');
const CONFIG = require('./app/config/config');
const app = require('./app/app');

Database.connect();

app.listen(CONFIG.PORT,function(error){
    if(error) return console.log(error);
    console.log(`Server running at port: ${CONFIG.PORT}`);
});
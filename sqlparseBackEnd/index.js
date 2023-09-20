
const express = require('express');
const dotenv = require('dotenv');
var fs = require('fs');
var path = require('path');
const cors = require('cors')


var morgan = require('morgan')


const categoriesRoutes = require("./routes/categories");
const injectDb = require('./middleware/injectDb')


dotenv.config({path: './config/config.env'});


const db= require('./config/mysql-db')

console.log(__dirname);     
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


const app = express();


app.use(cors())
app.use(express.json())

app.use(morgan('combined', { stream: accessLogStream }));
app.use(injectDb(db))

db.sequelize.sync().then(result => {
    console.log("sync実行が正常に修了しました。");
})
.catch((err) => console.log(err));

app.listen(process.env.PORT, console.log(`Expressサーバーが${process.env.PORT}ポートに開始しました。`));

app.use('/api/v1/categories', categoriesRoutes);

/** 
 * 
 * CẤU HÌNH EXPRESS 
 * 
 */


/** Khai báo dotevn */
require('dotenv').config();

/** Khai báo path join đến file ejs */
const path = require('path');


/** Khai báo express */
const express = require('express');
const app = express();
app.use(express.static('./public'));

/** Khai báo path đến file ejs */
app.set('views', path.join('./src', 'views'));
app.set('view engine', 'ejs');


/** Khai báo server */
const port = process.env.PORT || 8888;                  //port
const hostname = process.env.HOST_NAME;
// app.listen(port, hostname, () => {
//     console.log(`App listening on port ${port}`)
// });

const server = require('http').Server(app);
server.listen(port);

/** Tạo hàm getter cơ bản */
app.get('/', function (req, res) {
    res.render('index');
});



/** 
 * 
 * CẤU HÌNH SOCKET IO
 * 
 */


const io = require("socket.io")(server);


/** Hàm lắng nghe sự kiện kết nối */
io.on('connection', function (socket) {                   // Lắng nghe có người kết nối => on
    console.log("Có người kết nối --> " + socket.id);

    /** Hàm Lắng nghe sự kiện ngắt kết nối */
    socket.on('disconnect', function () {
        console.log("Đã ngắt kết nối  --> " + socket.id);
        console.log('\n*****************************');
    })

});


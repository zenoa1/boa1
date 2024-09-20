const http = require("http");
const path = require('path');
const express = require('express');
const logger = require("./utils/log");
const moment = require("moment-timezone");
const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");

const app = express();
const port = process.env.PORT || 2007; // Use Render's PORT environment variable

moment.locale("vi");
const startTime = new Date();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/utils/index.html'));
});

// Serve static files from the public directory if needed
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const ngayKhoiDong = moment(startTime).format("dddd, DD [tháng] MM [năm] YYYY");

    console.log(`Máy chủ đã bắt đầu hoạt động trên cổng ${port}, Giờ hiện tại: ${gio}, Ngày khởi động: ${ngayKhoiDong}\n\n`);
});

function startBot(message) {
    if (message) logger(message, "BOT Loading");
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });
    
    child.on("close", async (codeExit) => {
        if (codeExit === 1) return startBot("BOT Loading");
        if (codeExit === 2) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust if necessary
            startBot("Bot đã hoạt động, vui lòng chờ trong giây lát!");
        }
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ Starting ]");
    });
};

startBot();

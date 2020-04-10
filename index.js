const readline = require("readline");
const crypto = require("./crypto");
const fs = require("fs");

const CRYPT_MSG = '1';
const DECRYPT_MSG = '2';

const trimmedMsg = msg => {
    const withRussianE = msg.toLowerCase().replace(/[^а-яё]/g, '');
    const withRussianPair = withRussianE.replace(/[ё]/g, 'е');
    return withRussianPair;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(`Введите ${CRYPT_MSG} для шифра и ${DECRYPT_MSG} для дешифра: `, function (mode) {
    if (mode === CRYPT_MSG) {
        fs.readFile("key.txt", "utf8",
            function (error, data) {
                if (error) throw error;
                const key = data;
                fs.readFile("openText.txt", "utf8",
                    function (error, data) {
                        if (error) throw error;
                        const message = data;
                        const result = crypto(trimmedMsg(message), trimmedMsg(key));
                        console.log(`Ваша криптограмма: ${result}`);
                        rl.close();
                    });
            });
    }
    if (mode === DECRYPT_MSG) {
        fs.readFile("key.txt", "utf8",
            function (error, data) {
                if (error) throw error;
                const key = data;
                console.log('Ввод криптограммы из файла');
                fs.readFile("crypt.txt", "utf8",
                    function (error, data) {
                        if (error) throw error;
                        const message = data;
                        const result = crypto(trimmedMsg(message), trimmedMsg(key));
                        console.log(`Исходное сообщение: ${result}`);
                        rl.close();
                    });
            });
    }
});

rl.on("close", function () {
    console.log("\n ᓚᘏᗢ");
    process.exit(0);
});
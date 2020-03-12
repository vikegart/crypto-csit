const readline = require("readline");
const crypto = require("./crypto");

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
        rl.question("Введите ключ ", function (key) {
            rl.question("Введите открытый текст ", function (message) {
                const result = crypto(trimmedMsg(message), trimmedMsg(key));
                console.log(`Ваша криптограмма: ${result}`);
                rl.close();
            });
        });
    }
    if (mode === DECRYPT_MSG) {
        rl.question("Введите ключ ", function (key) {
            rl.question("Введите криптограмму ", function (message) {
                const result = crypto(message, trimmedMsg(key));
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
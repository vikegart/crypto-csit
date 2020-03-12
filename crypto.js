const DEBUG = false;
const ruArr = ['а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
const shiftedArr = ruArr.slice(16, 32);

const table = {};
const lengthPerRow = 16;
const buildModRow = (symbolsArr, index, lenght) => {
    if (index % 2 === 0) {
        return (symbolsArr.slice(0, 16));
    } else {
        if (index === 1) {
            return [...shiftedArr];
        }
        let k = 15;//шаг
        for (i = 0; i < k; i++) {
            shiftedArr.unshift(shiftedArr.pop());
        }
        return [...shiftedArr];
    }

}

ruArr.forEach((letter, index) => {
    const rowI = buildModRow(ruArr, index, lengthPerRow);
    table[letter] = rowI;
})
const arrFromTable = Object.keys(table).map((letter) => [letter, table[letter]]);


const isEven = num => num % 2 === 0;

const processCrypt = (message, key) => {
    let cryptogramma = '';
    for (let i = 0; i < message.length; i++) {
        //message[i]-символ сообщения
        //key[i%key.length]-символ ключа
        let indexOfKeySymbol = ruArr.indexOf(key[i % key.length]);
        DEBUG && console.log(ruArr.indexOf(key[i % key.length]) + 1)
        DEBUG && console.log(arrFromTable[indexOfKeySymbol][1]);
        let indexOfTextSymbol;
        DEBUG && console.log(arrFromTable[indexOfKeySymbol][1].indexOf(message[i]));
        indexOfTextSymbol = arrFromTable[indexOfKeySymbol][1].indexOf(message[i]);
        DEBUG && console.log(indexOfTextSymbol);
        if (indexOfTextSymbol === -1) {
            {
                if (isEven(indexOfKeySymbol)) {
                    indexOfTextSymbol = arrFromTable[indexOfKeySymbol + 1][1].indexOf(message[i]);
                    cryptogramma = cryptogramma + arrFromTable[indexOfKeySymbol][1][indexOfTextSymbol];
                } else {
                    indexOfTextSymbol = arrFromTable[indexOfKeySymbol - 1][1].indexOf(message[i]);
                    cryptogramma = cryptogramma + arrFromTable[indexOfKeySymbol][1][indexOfTextSymbol];
                }
            }
        } else {
            if (isEven(indexOfKeySymbol)) {
                cryptogramma = cryptogramma + arrFromTable[indexOfKeySymbol + 1][1][indexOfTextSymbol];
            } else {
                cryptogramma = cryptogramma + arrFromTable[indexOfKeySymbol - 1][1][indexOfTextSymbol];
            }
        }
        DEBUG && console.log(`${indexOfKeySymbol}  ${indexOfTextSymbol} ${message[i]}`);
    }
    return cryptogramma;
}

module.exports = processCrypt;

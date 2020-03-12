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
        //indexOfKeySymbol номер строки!, вычисляется по символу ключа
        //i % key.length эмулирует цикличное повторение написания ключа над открытым текстом
        let indexOfKeySymbol = ruArr.indexOf(key[i % key.length]);
        DEBUG && console.log(ruArr.indexOf(key[i % key.length]) + 1)
        DEBUG && console.log(arrFromTable[indexOfKeySymbol][1]);
        //номер столбца, вычисляется по символу открытого текста под ключом
        let indexOfTextSymbol;
        DEBUG && console.log(arrFromTable[indexOfKeySymbol][1].indexOf(message[i]));
        indexOfTextSymbol = arrFromTable[indexOfKeySymbol][1].indexOf(message[i]);
        DEBUG && console.log(indexOfTextSymbol);
        //если indexOfTextSymbol не нашелся, значит в этом столбце его нет, ищем в соседнем
        //сверху или снизу в зависимости от того, в четной мы строке искали или нет 
        //какой процесс идет - шифровка\дешифровка - вообще пох, функция одинакова везде
        if (indexOfTextSymbol === -1) {
            {
                //этот код не имеет никакого смысла, т.к. добавляет одну и туже хрень в обоих
                //случаях, но логика такова: если мы нашли в соседней строке этот символ из 
                //сообщения, то мы не можем им же закодировать себя, мы должны в качестве
                //его шифра брать символ из той строки, номер который лежит в indexOfKeySymbol, но
                //из того же столбца. Пример: мы смотрим в строку Б и ищем букву "в", но ее там нет
                //тогда мы смотрим в строку А,т.к. А и Б составляют ячейку, и находим "в" там. 
                //тогда буква в зашифруется буквой т, которая стоит под в из строки а в строке Б.
                if (isEven(indexOfKeySymbol)) {
                    indexOfTextSymbol = arrFromTable[indexOfKeySymbol + 1][1].indexOf(message[i]);
                    cryptogramma = cryptogramma + arrFromTable[indexOfKeySymbol][1][indexOfTextSymbol];
                } else {
                    indexOfTextSymbol = arrFromTable[indexOfKeySymbol - 1][1].indexOf(message[i]);
                    cryptogramma = cryptogramma + arrFromTable[indexOfKeySymbol][1][indexOfTextSymbol];
                }
            }
        } else {
            //тут мы оказались, если нашли нужный символ в строке, на которую указал indexOfKeySymbol
            //тогда просто смотрим в смежную строку (А смежно Б, В смежно Г и наборот) и меняем
            //символ. Прим: искали в А а, нашли поменяли а на р и добавили р в криптограмму.
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

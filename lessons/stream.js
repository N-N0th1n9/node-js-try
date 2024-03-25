// В nodejs есть 4 типа стримов
// Readable - чтение
// Writable - запись
// Duplex - Для чтения и записи Readable + Writable
// Transform - Такой же как Duplex, но может изменить данные по мере чтения

//Чтение файла по кусочкам(в отличие от fs.readFile()). По умолчанию 1 кусочек 64кбайт.
//Читаются не только файлы, но и передача чего-то по сети и и тд. Все что можно прочитать.

const fs = require('fs')
const path = require('path')

// fs.readFile(path.resolve('test.txt'), (err, data) => {
//     if (err) {
//         throw err
//     }
//     console.log(data)
// })

//Создаем стрим
// const stream = fs.createReadStream(path.resolve('test.txt', {...}))
//
// //Подписываемся на событие
// stream.on('data', (data) => {
//     console.log(data)
// })
// stream.on('open', () => {
//     console.log()
// })
// stream.on('end', () => {
//     console.log()
// })
// stream.on('error', (e) => {
//     console.log(e)
// })

//Запись в файл + создание
// const writableStream = fs.createWriteStream(path.resolve('test2.txt'))
// for (let i = 0; i < 20; i++) {
//     writableStream.write(i + '\n')
// }
// writableStream.end()
// writableStream.close()
// writableStream.destroy()
// writableStream.on('error')


const http = require('http')

http.createServer((req, res) => {
    // req - readable stream
    // res - writable stream
    const stream = fs.createReadStream(path.resolve('test.txt'))

    // Почему-то не работают методы write и end
    // Стрим закончит читать раньше чем пользователь скачает файл из-за того, что скорость инета ниже.
    // stream.on('data', chunk => res.write(chunk))
    // stream.on('end', chunk => res.end())

    // Метод, который синхронизирует writable и readable streams
    stream.pipe(res)
})
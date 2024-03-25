//Стандартный модуль для взаимодействия с файловой системой
const fs = require('fs')
const path = require('path')

//В fs есть как обычная так асинхронная версия методов. Первая не блокирует главный поток, другая блокирует.

//Синхронно(обычно) создает папку
// fs.mkdirSync(path.resolve(__dirname, 'dir'))
// //Создание рекурсивно(то есть будут папки в папках)
// fs.mkdirSync(path.resolve(__dirname, 'dir1', 'dir2', 'dir3'), {recursive: true})

//Асинхронно создает папку
// console.log('START')
// fs.mkdir(path.resolve(__dirname, 'async-dir'), (err) => {
//     if(err) {
//         console.log(err)
//         return
//     }
//     console.log('Папка создана')
// })
// console.log('END')

//Асинхронное удаление папки
// fs.rmdir(path.resolve(__dirname, 'dir'), (err) => {
//     if(err) {
//         throw err
//     }
// })

//Создание файла и запись в него данных. Если что данные в файле перезиписывается при повторном создании
// fs.writeFile(path.resolve('text.txt'), 'text text text', err => {
//     if(err) {
//         throw err
//     }
//
//     console.log('Файл записан')
// })
// //Добавление данных в конец
// fs.appendFile(path.resolve('text.txt'), '1 2 3 4 5', err => {
//     if(err) {
//         throw err
//     }
//
//     console.log('Файл дополнен')
// })

//или можно так
// fs.writeFile(path.resolve('text.txt'), 'text text text', err => {
//     if (err) {
//         throw err
//     }
//     console.log('Файл записан')
//
//     fs.appendFile (path.resolve('text.txt'), ' 99 98 97', err => {
//         if (err) {
//             throw err
//         }
//         console.log('Файл записан')
//     })
// })


//Через promise работа с файлом
const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, err => {
            if(err) {
                return reject(err.message)
            }
            resolve()
        })
    })
}
const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, err => {
            if(err) {
                return reject(err.message)
            }
            resolve()
        })
    })
}

//Читаем файл
const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, {encoding: "utf-8"}, (err, data) => {
            if(err) {
                return reject(err.message)
            }
            resolve(data)
        })
    })
}

//Удаляем файла
const removeFileAsync = async (path) => {
    return new Promise((resolve, reject) => {
        fs.rm(path, (err) => {
            if(err) {
                return reject(err.message)
            }
            resolve()
        })
    })
}
//
//
// writeFileAsync(path.resolve(__dirname, 'text2.txt'), 'Promise')
//     .then(() => appendFileAsync(path.resolve('text2.txt'),'Promise'))
//     .then(() => appendFileAsync(path.resolve('text2.txt'), 'Promise'))
//     .then(() => appendFileAsync(path.resolve('text2.txt'), 'Promise'))
//     .then(() => readFileAsync(path.resolve('text2.txt')))
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//
//
// readFileAsync(path.resolve('text2.txt'))
//     .then(() => console.log('Файл удален'))


// Через переменную окружения передать строку, записать ее в файл
// прочитать файл, посчитать кол-во слов в файле и записать
// их в новом файле count.txt, затем удалить новый.

const text = process.env.TEXT || ''

writeFileAsync(path.resolve('text3.txt'), text)
    .then(() => readFileAsync(path.resolve('text3.txt')))
    .then(data => data.split(' ').length)
    .then(count => writeFileAsync(path.resolve('count.txt'), `Кол-во слов ${count}`))
    .catch((err) => console.log(err))


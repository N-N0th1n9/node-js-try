// Стандартный модуль который позволяет взаимодействовать с путями
const path = require('path')

// Позволяет склеивать пути '/'.
// Используется для того, чтобы на зарных OC не было конфликта с сепаратором '/', в отличие от обычной строки 'first/second/third'
console.log(path.join('first', 'second', 'third'))
console.log(path.join(__dirname, 'file')) // __dirname -  путь к текущей директории (абсолютный)
console.log(path.join(__dirname, '..')) // вернуться на одну папку назад и тд

console.log(path.resolve('file')) // всегда содержит абсолютный путь(__dirname)
console.log(path.resolve('/file')) // получим абсолютный путь от файла file

// Парсинг пути
const fullpath = path.resolve(__dirname, 'file')
console.log(path.parse(fullpath))

// Менее важный методы
console.log(path.sep) // Разделитель(сепаратор) в ОС
console.log(path.isAbsolute(fullpath)) // Проверка на абсолютносить пути
console.log(path.basename(fullpath)) // Название файла
console.log(path.extname(fullpath)) // Расширение файла


//создание URL
const siteURL = 'http://localhost:8080/users?id=5123'
const url = new URL(siteURL)

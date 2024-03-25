//Глобалальный объект с помощью которого можно получить информацию о текущем процессе
console.log(process.pid) //получить id текущего процесса

// while(true) {
//
// }
//прописав в консоль kill [номер процесса], можем его закончить

//Для того чтобы задать свой env необзодимо скачать библиотеку cross-env.
//NODE_ENV указана при запуске приложения в package.json + надо указать cross-env
// console.log(process.env.PORT); //переменные окружения
// console.log(process.env.NODE_ENV);

//или в файл .env, но для него необходимо скачать библиотеку dotenv
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);

// Аргументы при запуске приложения
console.log(process.argv)

// Завершает работу приложения
// process.exit()
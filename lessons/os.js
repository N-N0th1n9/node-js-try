const os = require('os')

//Информация о системе и ос
// console.log(os.platform())
// console.log(os.arch())
// console.log(os.cpus().length)


//
const cpus = os.cpus()

for (let i; i < cpus.length - 2; i++) { //Вычитаем чтобы оставить свободные ядра у процессора
    const CPUcore = cpus[i]
    console.log('Запустить еще один процесс')
}

console.log(process.pid)

while(true) {

}


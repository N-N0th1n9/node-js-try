// Позволяет создать события(подписываться на них, генерировать)
const Emitter = require('events')

const emitter = new Emitter()

// Создаем событие(1 - название, 2 - колбек который содержит логику события
const callback = (data, second) => {
    console.log('Вы прислали сообщение: ' + data)
    console.log('Вы прислали сообщение: ' + second)
}
emitter.on('message', callback)

const MESSAGE = process.env.message || ''

// Генерация события
if (MESSAGE) {
    emitter.emit('message', MESSAGE, 123)
} else {
    emitter.emit('message', 'Вы не указали сообщене')
}

// Когда удобно использовать?
// При создании http серверов
// При обмене сообщениями
// Когда нужно сгенерировать определенное событие на действие
// Websockets
// Clusters

emitter.removeAllListeners() //Удаление всех слушателей
emitter.removeListener("message", callback) // Удаление определенного слушателя
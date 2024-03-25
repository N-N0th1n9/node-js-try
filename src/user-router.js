const Router = require('../framework/Router')
const controller = require('./user-controller')
const router = new Router()


// перенесли в user-controller.js
// router.get('/users', (req, res) => {
//     //Объявляем заголовок для того, чтобы браузер понимал что мы отправляем/получаем json
//     //Для того чтобы для каждого запроса не указывать header, создали middleware parseJSON который это делает за нас.
//     // res.writeHead(200, {
//     //     "Content-type": 'application/json'
//     // })
//     // res.end(JSON.stringify(users))
//
//     if (req.params.id) {
//         return res.send(users.find(user => user.id == req.params.id))
//     }
//
//     res.send(users)
// })
//
// router.post('/users', (req, res) => {
//     // res.writeHead(200, {
//     //     "Content-type": 'application/json'
//     // })
//     // res.end(JSON.stringify(users))
//     console.log(req.body)
//     const user = req.body
//     users.push(user)
//     res.send(user)
// })

router.get('/users', controller.getUsers)
router.post('/users', controller.createUser)

module.exports = router
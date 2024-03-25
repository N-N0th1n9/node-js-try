const http = require('http')
const EventEmitter = require('events')

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter()
        this.server = this._createServer()
        this.middlewares = []
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    //Структура эндпоинта
    // endpoint = {
    //     '/users': {
    //         'GET': handler
    //     }
    // }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];

            Object.keys(endpoint).forEach(method => {
                this.emitter.on(this._getRouterMask(path, method), (req, res) => {
                    const handler = endpoint[method];
                    handler(req, res);
                });
            });
        });
    }

    listen(port, callback) {
        this.server.listen(port, callback)
    }

    //_ означает что метод приватный
    _createServer() {
        return http.createServer((req, res) => {
            //req - Readable stream и, для того чтобы получить тело запроса, нам с помощью stream его нужно прочитать
            let body = ""
            req.on('data', chunk => {
                body += chunk
            })

            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body)
                }

                this.middlewares.forEach(middleware => middleware(req, res))

                const emitted = this.emitter.emit(this._getRouterMask(req.pathname, req.method), req, res)
                if (!emitted) {
                    res.end()
                }
            })


        })
    }

    _getRouterMask(path, method) {
        return `[${path}]:[${method}]`
    }
}

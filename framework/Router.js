//Вот так вот экспортировать
module.exports = class Router {
    //Этот класс мини фреймворк
        constructor() {
            this.endpoints = {}
        }

        request(method = 'GET', path, handler) {
            if(!this.endpoints[path]) {
                this.endpoints[path] = {}
            }

            // /users [GET, POST, PUT] /posts [GET, POST, PUT, DELETE]
            const endpoint = this.endpoints[path]

            if(endpoint[method]) {
                throw new Error(`[${method}] по адресу ${path} уже существует`)
            }

            endpoint[method] = handler
        }

        // Набор методов для вызова функций request
        get(path, handler) {
            this.request("GET", path, handler)
        }
        post(path, handler) {
            this.request("POST", path, handler)
        }
        put(path, handler) {
            this.request("PUT", path, handler)
        }
        delete(path, handler) {
            this.request("DELETE", path, handler)
        }
    }
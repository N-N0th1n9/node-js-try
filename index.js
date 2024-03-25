//В package.json запускаем проект с помощью nodemon, чтобы сервер автоматически перезагружался.

// const http = require('http')
// const EventEmitter = require('events')
const PORT = process.env.PORT || 5001
const Application = require('./framework/Application')
const UserRouter = require('./src/user-router')
//https://mongoosejs.com/docs/index.html
const mongoose = require('mongoose');
const jsonParser = require('./framework/parseJSON')
const urlParser = require('./framework/parseURL')

const app = new Application()

app.use(jsonParser)
app.use(urlParser('http://localhost:5001'))
app.addRouter(UserRouter)


const uri = "mongodb+srv://admin:admin@cluster0.orqbdhp.mongodb.net/";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}
run().catch(console.dir);

// const server = http.createServer((req, res) => {
//    const emitted = emitter.emit(`[${req.url}]:[${req.method}]`, req, res)
//     if (!emitted) {
//         res.end()
//     }
// })

// что сервер начал слушать входные соединения
// server.listen()


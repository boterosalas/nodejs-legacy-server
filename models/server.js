const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Database connection
        this.dbConnect();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'))

    }

    routes() {
        this.app.use('/api/auth', require('../routes/auth.js'));
        this.app.use('/api/users', require('../routes/user.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}!`)
        });
    }
}

module.exports = Server;
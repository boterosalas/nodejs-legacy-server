const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
      uploads: "/api/uploads",
    };

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
    this.app.use(express.static("public"));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.js"));
    this.app.use(this.paths.users, require("../routes/user.js"));
    this.app.use(this.paths.categories, require("../routes/categories.js"));
    this.app.use(this.paths.products, require("../routes/products.js"));
    this.app.use(this.paths.search, require("../routes/search.js"));
    this.app.use(this.paths.uploads, require("../routes/uploads.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}!`);
    });
  }
}

module.exports = Server;

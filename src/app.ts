import express from "express";
import router from "./routes/routes.js";
import api_router from "./api/v1/api_routes.js";
import { engine } from "express-handlebars";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { readJWTPayload } from "./authorization.js";
import { appConfiguration } from "./config.js";

export const app = express();

// Body data of a HTML Reqquest should be considered and read as json data
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Send cookies from the client should be considered
app.use(cookieParser());

// Use handlebars to render pages
app.engine("handlebars", engine());
app.set("view engine", "handlebars");

// load default views from the folder: "./srv/views"
app.set("views", "./src/views/");

// Log every request in the console (middleware)
app.use((req, _, next) => {
	console.log(req.method, req.url);
	next();
});

// Read JWT cookie if it exists and verify it
app.use(readJWTPayload);

// Route every request to /static to the folder "src/static"
app.use("/static", express.static("src/static"));

// Route every other request to /[somtheting] to the importer router
app.use("/", router);

// Route every request to "/api/v1" to the api router
app.use("/api/v1", api_router);

appConfiguration(app);

// 404 not found
app.use((_, res) => {
	res.status(404).render("404");
});

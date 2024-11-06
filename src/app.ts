import express from "express";
import router from "./routes.js"
import routerLogin from "./login.js"
import api_router from "./api/v1/api_routes.js";
import { engine } from "express-handlebars";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";

export const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views/");


app.use((req, res, next) => {
	console.log(req.method, req.url);
	next();
});


app.use("/static", express.static("src/static"));
app.use("/", router);
app.use("/login", routerLogin);
app.use("/api/v1", api_router);

// 404 not found
app.use((req, res) => {
	res.status(404).render("404");
});
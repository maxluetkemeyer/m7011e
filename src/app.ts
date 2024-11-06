import express from "express";
import router from "./routes.ts"
import routerLogin from "./login.ts"
import api_router from "./api/v1/api_routes.ts";
import { engine } from "express-handlebars";
import bodyparser from "body-parser";

export const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
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
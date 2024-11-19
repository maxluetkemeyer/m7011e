import express from "express";
import router from "./routes/routes.js";
import api_router from "./api/v1/api_routes.js";
import { engine } from "express-handlebars";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { readJWTPayload } from "./authorization.js";

export const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyparser.json());

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views/");

app.use((req, _, next) => {
	console.log(req.method, req.url);
	next();
});

app.use(readJWTPayload())

app.use("/static", express.static("src/static"));
app.use("/", router);
app.use("/api/v1", api_router);

// 404 not found
app.use((_, res) => {
	res.status(404).render("404");
});

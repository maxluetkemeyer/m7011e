import express from "express";
import router from "./routes.ts"
import api_router from "./api/v1/api_routes.ts";
import { engine } from "express-handlebars";

export const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views/");

app.use("/static", express.static("src/static"));
app.use("/", router);
app.use("/api/v1", api_router);

// 404 not found
app.use((req, res) => {
	res.status(404).render("404");
});
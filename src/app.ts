import express from "express";
import articles from "./api/v1/articles.ts";



export const app = express();

app.get("/", (req, res) => {
	res.send("Hello World! and hello ltu");
});

articles(app);


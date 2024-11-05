import express from "express";

export default function (app: express.Application) {
    
    const article = {
        id: 1,
        title: "Hello World!",
        content: "This is my first article"
    }


    app.get("/api/v1/articles", (req, res) => {
        //res.send("Hello World! and hello ltu");
        res.json(article);
    });
}
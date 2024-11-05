import express from "express";

export default function define_routes(app: express.Application) {
	app.get("/", (req, res) => {
		res.render("index", { myVar: "Hey"});
	});
    app.get("/login", (req, res) => {
        res.render("login", { myVar: "Hey"});
    })
    app.get("/dashboard", (req, res) => {
		res.render("users/dashboard", { myVar: "Hey" });
	});
    app.get("/dashboard/write_article", (req, res) => {
		res.render("users/write_article", { myVar: "Hey" });
	});
    app.get("/dashboard/edit_users", (req, res) => {
		res.render("users/admin/edit_users", { myVar: "Hey" });
	});
    app.get("/dashboard/edit_user", (req, res) => {
		res.render("users/admin/edit_user", { myVar: "Hey" });
	});
}

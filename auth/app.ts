import express from "express";
import routerLogin from "./login/router.js"
import routerRegister from "./register/router.js"
import bodyparser from "body-parser";

export const app = express();

// Body data of a HTML Reqquest should be considered and read as json data
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Log every request in the console (middleware)
app.use((req, _, next) => {
	console.log("[AUTH]", req.method, req.url);
	next();
});

// Route every other request to /[somtheting] to the importer router
app.use("/auth/login", routerLogin);
app.use("/auth/register", routerRegister)



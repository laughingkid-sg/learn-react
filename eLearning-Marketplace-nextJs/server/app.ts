import express, { Express } from "express"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes"
import db from "./db"
import csrf from "csurf";
import cookieParser from "cookie-parser";
require("dotenv").config()

const app: Express = express()
const port = process.env.PORT || 8080

const csrfProtection = csrf({ cookie: true });

db()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(morgan("dev"))
app.use((req, res, next) => {
	console.log("middlwarew")
	next()
})

// route
routes.map(r => {
	app.use("/api", r)
})

// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
	res.json({ csrfToken: req.csrfToken() });
});
  


app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

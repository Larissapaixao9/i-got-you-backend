import cors from "cors";
import express from "express";
import "express-async-errors";
import  {errorHanddlingMiddleware}  from '../src/middlewares/error_handler_middleware'
import router from '../src/routers/mainRouter'
import dotenv from 'dotenv'
dotenv.config()
const domainsFromEnv = process.env.CORS_DOMAINS || ""

const app = express();
app.use(cors());
app.use(express.json());
app.use(router)
app.use(errorHanddlingMiddleware)

export default app;


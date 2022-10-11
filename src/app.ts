import cors from "cors";
import express from "express";
import "express-async-errors";
import  {errorHanddlingMiddleware}  from '../src/middlewares/error_handler_middleware'
import router from '../src/routers/mainRouter'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const domainsFromEnv = process.env.CORS_DOMAINS || ""

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
  origin: function (origin:any, callback:any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(cors());
app.use(express.json());
app.use(router)
app.use(errorHanddlingMiddleware)

export default app;


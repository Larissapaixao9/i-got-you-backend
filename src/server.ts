import app from "./app";
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});


// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import "express-async-errors";
// import router from '../src/routers/mainRouter'
// import  {errorHanddlingMiddleware}  from '../src/middlewares/error_handler_middleware'

// dotenv.config()

// const app = express()

// //middlewares
// app.use(cors())
// app.use(express.json())
// app.use(router)
// app.use(errorHanddlingMiddleware)

// const PORT = process.env.PORT || 5000




// app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))
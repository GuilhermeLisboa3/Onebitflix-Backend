import { sequelize } from './database/index';
import express from 'express'
import {adminJs ,adminJsRouter} from "./adminjs"

const app = express()

app.use(adminJs.options.rootPath, adminJsRouter)
app.use(express.static('public'))

const PORT = process.env.port || 3000

app.listen(PORT, () => {
  sequelize.authenticate().then(()=>{
    console.log('BD connection successfull')
  })
  console.log(`Server started successfuly at port ${PORT}`)
})
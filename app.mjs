import dotenv from "dotenv"
import express from 'express'
import morgan from 'morgan'
import {router} from './routes.mjs'
import MongoConnection from './config/mongodb-connection.mjs'

dotenv.config()

const PORT = process.env.PORT || 5050
const app = express()

const dbConnection = new MongoConnection()
dbConnection.connect().then((result) => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
        app.emit( "app_started" )
    })
})
.catch((err) => console.log(err))

app.use(morgan('default'))
app.use(express.json())

const apiPath = '/api/v1/'

app.use(apiPath + 'todo', router)

app.get('', (req, res) => {
    res.status(200).send('a')
});

app.use((err, _req, res, next) => {
    res.status(500).send(err.message)
})

export default app
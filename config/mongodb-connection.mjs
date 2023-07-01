import mongoose from 'mongoose'
import Connection from './connection.mjs'
import '../load-env.mjs'

/**
 * Class for mongoDB connection
 */
class MongoConnection extends Connection {
    // set the 
    constructor(strcon=process.env.ATLAS_URI) {
        super(strcon)
    }

    async connect() {
        await mongoose.connect(this.strcon, { useNewUrlParser: true, useUnifiedTopology: true })
    }
}

export default MongoConnection
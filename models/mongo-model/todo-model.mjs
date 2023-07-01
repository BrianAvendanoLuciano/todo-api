
import Model from '../model.mjs'
import mongoose from 'mongoose'

/**
 * Model for todo schema
 */
class TodoModel extends Model {
    // inject schema
    constructor(schema) {
        super(schema)
    }

    model() {
        return mongoose.model('Todo',  this.schema)
    }
}

export default TodoModel;
import mongoose from 'mongoose'
import TodoModel from './mongo-model/todo-model.mjs'

/**
 * Factory for Todo Model
 */
export class TodoModelFactory {
    /**
     * 
     * @param {string} dbType 
     * @returns database Model
     */
    static createTodo(dbType) {
        switch(dbType) {
            case 'mysql':
              return 'mysql is not configured yet'
            case 'mongodb':
              return new TodoModel(this.getSchema(dbType))
            default:
              return 'no default config'
        }
    }

    /**
     * 
     * @param {string} dbType 
     * @returns object schema
     */
    static getSchema(dbType) {
        switch(dbType) {
            case 'mysql':
              return 'mysql is not configured yet'
            case 'mongodb':
                const Schema = mongoose.Schema
                return Schema({
                    title: {
                        type: String,
                        required: true
                    },
                    body: {
                        type: String,
                        required: true
                    }
                }, { timestamps: true })
            default:
              return 'no default config'
        }
    }
}
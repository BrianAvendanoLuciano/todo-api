import { ObjectId } from 'mongodb'
import { TodoModelFactory } from '../models/todo-model-factory.mjs'

/**
 * Class for todo routes
 */
export class TodoRoute {
    // initialize default values
    todo = TodoModelFactory.createTodo('mongodb')
    todoModel = this.todo.model()
    limit = 10
    offset = 0

    constructor(){}

    /**
     * Get all of todos
     * filter todo by id
     * paginate todo
     * @param {express req} req 
     * @param {express res} res 
     * @returns json response
     */
    get(req, res) {
        const id = req.query.id
        let limit = req.query.limit ? req.query.limit : this.limit
        let page = req.query.offset ? req.query.offset : this.offset
        if (id) {
            this.todoModel.findById(ObjectId(id))
            .limit(limit)
            .skip(limit * page)
            .then((result) => {
                res.status(200).json(result)
            })
            .catch((err) => {console.log(err)})
            return
        }
        this.todoModel.find()
        .limit(limit)
        .skip(limit * page)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((err) => {console.log(err)})
    }

    /**
     * creates new todo
     * @param {express req} req 
     * @param {express res} res 
     * @returns json response
     */
    post(req, res) {
        const todo = new this.todoModel(req.body);
    
        todo.save()
            .then((result) => {
                res.status(201).json({
                    message: 'new todo successfully added'
                })
            })
            .catch((err) => {
                res.status(400).json({
                    message: err.message
                })
            })
    }
    
    /**
     * delete a todo
     * @param {express req} req 
     * @param {express res} res 
     * @returns no content | json response
     */
    delete(req, res) {
        const id = req.query.id
        this.todoModel.findByIdAndDelete(id.toString())
        .then((result) => {
            res.status(204).json()
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    }

    /**
     * updates todo
     * @param {express req} req 
     * @param {express res} res 
     * @returns json response
     */
    patch(req, res) {
        const id = req.query.id
        this.todoModel.findByIdAndUpdate(id, req.body)
        .then((result) => {
            res.status(200).json({
                message: 'todo successfully updated'
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            })
        })
    }
}
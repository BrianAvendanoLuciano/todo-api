import express from 'express'
import { query, body, validationResult  } from 'express-validator'
import { TodoRoute } from "./routes/todo.mjs"

const router = express.Router()

const todo = new TodoRoute()

router.get('', (req, res) => {
    
    return todo.get(req, res)
});

router.post('', body('title').notEmpty(), (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() })
    }

    return todo.post(req, res)
});

router.delete('', (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() })
    }

    return todo.delete(req, res)
});

router.patch('', query('id').notEmpty(), (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        return res.send({ errors: result.array() })
    }
    return todo.patch(req, res)
});

export {router};
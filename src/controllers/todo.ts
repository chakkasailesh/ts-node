import { RequestHandler } from 'express'
import { Todo } from '../models/todo'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text
  const todo = new Todo(Math.floor(Math.random() * 100).toString(), text)
  TODOS.push(todo)

  res
    .status(201)
    .json({ message: 'Todo created successfully', createdTodo: todo })
}

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id
  const { text } = req.body as { text: string }
  const index = TODOS.findIndex((todo) => todo.id === id)
  if (index < 0) throw new Error('No todo with that id found')
  TODOS[index].text = text
  res
    .status(200)
    .json({ message: 'Updated todo successfully', updatedTodo: TODOS[index] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const { id } = req.params
  const index = TODOS.findIndex((todo) => todo.id === id)
  if (index < 0) throw new Error('No todo with that id found')
  TODOS.splice(index, 1)
  res.status(200).json({ message: 'Deleted todo successfully' })
}

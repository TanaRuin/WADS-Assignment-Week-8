import {Todo} from '../models/Todo.js';

// Get all todos for current user
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.status(200).json(todos);
  } catch (err) {
    console.error("Get Todos Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new todo
const createTodo = async (req, res) => {
  const { text, deadline } = req.body;

  try {
    const todo = await Todo.create({
      userId: req.user.id,
      text,
      deadline,
      completed: false
    });

    res.status(201).json(todo);
  } catch (err) {
    console.error("Create Todo Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing todo
const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { text, completed, deadline } = req.body;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo || todo.userId !== req.user.id) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.text = text ?? todo.text;
    todo.completed = completed ?? todo.completed;
    todo.deadline = deadline ?? todo.deadline;

    await todo.save();

    res.status(200).json(todo);
  } catch (err) {
    console.error("Update Todo Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByPk(id);

    if (!todo || todo.userId !== req.user.id) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    await todo.destroy();

    res.status(200).json({ message: 'Todo deleted' });
  } catch (err) {
    console.error("Delete Todo Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
};

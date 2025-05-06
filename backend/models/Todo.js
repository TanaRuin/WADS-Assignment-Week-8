import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import { UUIDV4 } from 'sequelize';
const Todo = sequelize.define('Todo', {
  text: {
    type: String,
    allowNull: false
  },
  completed: {
    type: String,
    defaultValue: false
  },
  deadline: {
    type: String
  }
});

export {Todo};

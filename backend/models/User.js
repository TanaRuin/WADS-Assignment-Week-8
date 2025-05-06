import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../config/db.js';


const User = sequelize.define('User', {
  id: {
    type: String,
    primaryKey: true,
    defaultValue: () => uuidv4(), // ✅ use correct field name and type
  },
  email: {
    type: String,
    unique: true,
    allowNull: false
  },
  password: {
    type: String,
    allowNull: false
  },
  name: {
    type: String,
    defaultValue: ''
  }
});

export{ User };


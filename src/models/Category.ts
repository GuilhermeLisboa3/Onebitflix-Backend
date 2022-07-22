// src/models/Category.ts

import { sequelize } from '../database'
import { DataTypes, Model, Optional } from 'sequelize'

export interface CategoryAttributes {
  id: number
  name: string
  position: number
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> {}

export interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes {}

export const Category = sequelize.define<CategoryInstance, CategoryAttributes>('Categories', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  position: {
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER
  }
})
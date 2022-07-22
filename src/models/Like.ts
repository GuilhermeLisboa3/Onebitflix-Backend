import { Model,DataTypes } from "sequelize";
import { sequelize } from "../database";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";

export interface Like {
  userId: number;
  courseId: number;
}

export interface LikeInstance extends Model<Like>, Like {
  Course?: CourseInstance 
  User?: UserInstance
}

export const Like = sequelize.define<LikeInstance, Like>("Like", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: { model: "courses", key: "id" },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
});

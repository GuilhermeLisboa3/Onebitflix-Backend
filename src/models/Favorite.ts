import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";

export interface Favorite {
  userId: number;
  courseId: number;
}

export interface FavoriteInterface extends Model<Favorite>, Favorite {
  courses?: CourseInstance;
  user?: UserInstance;
}

export const Favorite = sequelize.define<FavoriteInterface, Favorite>(
  "favorite",
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    courseId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  }
);

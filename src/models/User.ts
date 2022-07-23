// src/models/User.ts

import { sequelize } from "../database";
import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { EpisodeInstance } from "./Episodes";

type CheckPasswordCallback = (err?: Error | undefined, isSame?: boolean) => void;

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  birth: Date;
  email: string;
  password: string;
  role: "admin" | "user";
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  
  Episodes?: EpisodeInstance[]
  checkPassword: (password: string, callbackfn: CheckPasswordCallback) => void;
}

export const User = sequelize.define<UserInstance, UserAttributes>(
  "Users",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    birth: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeSave: async (user) => {
        if (user.isNewRecord || user.changed("password")) {
          user.password = await bcrypt.hash(user.password.toString(), 10);
        }
      },
    },
  }
);

User.prototype.checkPassword = function (
  password: string,
  callbackfn: CheckPasswordCallback
) {
  bcrypt.compare(password, this.password, (err, isSame) => {
    if (err) {
      callbackfn(err);
    } else {
      callbackfn(err, isSame);
    }
  });
};

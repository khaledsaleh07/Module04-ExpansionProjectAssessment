import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM("category1", "category2", "category3", "category4"),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          model: "User",
          key: "id",
          as: "userId",
        },
    },
},
    { timestamps: true }
);

export default Product;
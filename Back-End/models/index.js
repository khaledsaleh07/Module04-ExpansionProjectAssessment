import User from  "./User";
import Product from "./Product";

User.hasMany(Product, {
    foreignKey: "userId",
    as: "products"
});

Product.belongsTo(User, {
    foreignKey: "userId",
    as: "products",
});

export {User, Product};
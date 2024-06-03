const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

const User = sequelize.define('users', {
    username: DataTypes.STRING
});
const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    quantity: DataTypes.INTEGER
});

const Cart = sequelize.define('carts', {
    productId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'products', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    }
});
Cart.hasMany(Product);
Cart.belongsTo(User)
const Order = sequelize.define('orders', {
    cartId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'carts', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'products', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
});

Order.hasMany(Cart);
Order.belongsTo(User);
Order.hasMany(Product);



(async () => {
    try {
        await sequelize.afterSync()
        const jane = await User.create({
            username: 'janedoe',
        });
        const product = await Product.create({
            name: 'toy',
            quantity: 1
        });
        const cart = await Cart.create({
            productId: 1,
            userId: 1
        });
        const order = await Order.create({
            cartId: 1,
            userId: 1,
            productId: 1
        });
          console.log(jane.toJSON());
    } catch (error) {
        console.error("Error in sync:", error);
    }
})();

module.exports = {sequelize, User, Order, Cart, Product};

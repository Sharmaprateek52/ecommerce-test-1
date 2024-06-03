const express = require("express");
const { sequelize, Order, Cart } = require("./db-connector");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();

app.get('/order-with-items', async (req, res) => {
    return new Promise((resolve, reject) => {
        let itemId = req.query.id;
        let orderData, total;
        Order.count({
            where: {productId: itemId}
        })
        .then((data) => {
            orderData = data;
            return Order.count({})
            // resolve(res.send(data));
        })
        .then((data) => {
            total = data;
            // data.forEach(element => {
            //     orderData.rows
            // });
            console.log(orderData);
            let percentage = ((orderData)/total) * 100;
            resolve(res.send({percentage}));
        })
        // Order.findOne({
        //     where: {id: itemId}
        // }).then((data) => {
        //     return Cart.findOne({
        //         where: {id: data.cartId}
        //     })
        // }).then((data) => {
        //     resolve(res.send(data));
        // })
    })
})

app.listen(3000, () => {
    console.log('---Server running on port 3000---');
})

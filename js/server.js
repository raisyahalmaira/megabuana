const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MidtransClient = require('midtrans-client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/payment', async (req, res) => {
    const { name, email, mobile, totalPrice } = req.body;

    const snap = new MidtransClient.Snap({
        isProduction: false, // Set true jika menggunakan mode produksi
        serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
        transaction_details: {
            order_id: `order-${Date.now()}`,
            gross_amount: totalPrice,
        },
        item_details: [
            {
                id: 'item1',
                price: totalPrice,
                quantity: 1,
                name: 'Pengiriman Barang',
            },
        ],
        customer_details: {
            first_name: name,
            email: email,
            phone: mobile,
        },
    };

    try {
        const snapToken = await snap.createTransaction(parameter);
        res.json({ token: snapToken.token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
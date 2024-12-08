const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer"); // Impor model Customer

// Endpoint untuk menyimpan data
router.post("/add", async (req, res) => {
    const { name, email, mobile, weight, specialNote } = req.body;
    const pricePerKg = 40000;

    try {
        const newCustomer = new Customer({
            name,
            email,
            mobile,
            weight,
            specialNote,
            price: weight * pricePerKg,
        });

        await newCustomer.save();
        res.status(201).json({ message: "Data berhasil disimpan!" });
    } catch (error) {
        res.status(500).json({ error: "Gagal menyimpan data", details: error });
    }
});

module.exports = router;

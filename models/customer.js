const mongoose = require("mongoose"); // Mengimpor pustaka Mongoose untuk mengelola MongoDB.

// Membuat skema data untuk pelanggan.
const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nama pelanggan (wajib diisi).
    email: { type: String, required: true }, // Email pelanggan (wajib diisi).
    mobile: { type: String, required: true }, // Nomor telepon pelanggan (wajib diisi).
    weight: { type: Number, required: true }, // Berat (wajib diisi).
    specialNote: { type: String }, // Catatan khusus (opsional).
    price: { type: Number, required: true }, // Total harga (wajib diisi).
});

// Mengekspor model Customer agar dapat digunakan di file lain.
module.exports = mongoose.model("Customer", CustomerSchema);

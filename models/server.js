const express = require("express"); // Framework untuk membuat server.
const mongoose = require("mongoose"); // Untuk koneksi MongoDB.
const bodyParser = require("body-parser"); // Untuk membaca data JSON dari permintaan.
const cors = require("cors"); // Untuk mengizinkan lintas origin.

const customerRoutes = require("./routes/customerRoutes"); // Mengimpor router pelanggan.

const app = express(); // Membuat aplikasi Express.
const PORT = 5000; // Port untuk server.

// Middleware
app.use(cors()); // Mengaktifkan CORS.
app.use(bodyParser.json()); // Memungkinkan server membaca data JSON.

// Koneksi ke MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/megabuana", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

// Menggunakan router
app.use("/api/customers", customerRoutes); // Rute "/api/customers" menggunakan router pelanggan.

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

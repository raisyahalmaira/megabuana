const pricePerKg = 40000; // Harga per kg

// Fungsi untuk memperbarui harga berdasarkan berat yang dimasukkan
function updatePrice() {
    const weightInput = document.getElementById("weight").value; // Ambil berat dari input
    const priceDisplay = document.getElementById("priceDisplay"); // Elemen untuk menampilkan harga

    // Pastikan berat valid (tidak negatif atau kosong)
    const weight = parseFloat(weightInput) || 0;

    // Hitung total harga
    const totalPrice = weight * pricePerKg;

    // Format harga dan tampilkan
    priceDisplay.textContent = `Harga: Rp. ${totalPrice.toLocaleString()}`;
}

// Event listener untuk menangani pengiriman form
document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;
    const weight = document.getElementById('weight').value;
    const totalPrice = parseFloat(weight) * pricePerKg;

    // Kirim data ke backend untuk mendapatkan Snap Token
    fetch('http://localhost:5000/api/payment', { // Ganti dengan URL backend Anda
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, mobile, totalPrice }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Panggil Midtrans Snap untuk melakukan pembayaran
            window.snap.pay(data.token, {
                onSuccess: function(result) {
                    alert('Pembayaran berhasil!');
                    console.log(result);
                },
                onPending: function(result) {
                    alert('Pembayaran sedang diproses!');
                    console.log(result);
                },
                onError: function(result) {
                    alert('Pembayaran gagal!');
                    console.log(result);
                },
                onClose: function() {
                    alert('Pembayaran ditutup!');
                }
            });
        } else {
            alert('Gagal mendapatkan token pembayaran!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memproses pembayaran!');
    });
});
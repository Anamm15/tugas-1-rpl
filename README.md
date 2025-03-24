# tugas-1-rpl

Disini saya membuat suatu sistem pengelolaan bandara dengan booking tiket sebagai fitur utamanya. Saya menggunakan React untuk frontend dan Express untuk sisi backend. Saya juga menggunakan ORM sequelize untuk mempermudah kueri. Saya menggunakan mysql sebagai dbms dikarenakan mysql lebih sederhana dan lebih awam bagi saya, mysql juga mempunyai kecepatan read dan write yang baik sehingga cocok digunakan untuk apilikasi berbasis transaksi jika skalanya mulai lebih besar.

Desain database saya mempunyai beberapa tabel dan relasi, yakni
1. Account -> Tabel untuk menyimpan data terkait akun.
2. Employee -> Tabel untuk menyimpan data karyawan bandara yang juga dapat berelasi dengan Account.
3. Passenger -> Tabel untuk menyimpan data Account tambahan untuk kebutuhan pembelian tiket.
4. Airline -> Tabel yang meyimpan data maskapai.
5. Aircraft -> Tabel yang menyimpan data pesawat terbang dari maskapai.
6. Flight -> Tabel yang meyimpan jadwal penerbangan.
7. Tiket -> Tabel yang menyimpan tiket dari jadwal penerbangan.
8. Booking -> Tabel yang menyimpan data transaksi pembelian tiket oleh passenger.
9. Departure -> Tabel data penerbangan (take off) dengan waktu dan status yang lebih terupdate dibandingkan dengan jadwal sebelumnya yang sudah berada pada jadwal penerbangan.
10. Arrival -> Tabel data penerbangan (landing) dengan waktu dan status yang lebih terupdate dibandingkan dengan jadwal sebelumnya yang sudah berada pada jadwal penerbangan.

Dalam desain tersebut, tedapat beberapa relasi one to one seperti account - employee, account - passenger, flight- arrival, flight - departure dikarenakan tabel yang memuat foreignKey hanya boleh memuat satu data dari relasinya. Kemudian sisanya one to many karena satu primaryKey dapat mempunyai beberapa foreignKey di tabel lain.
